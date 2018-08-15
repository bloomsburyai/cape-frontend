# Annotations

Annotations are made up of a pair consisting of a canonical question and
the response it should produce, combined with a position within a document.
In addition to the canonical question an annotation may have also have
many paraphrased questions associated with it which should produce the 
same answer (e.g. "How old is Jim?" vs "What is Jim's age?").

The canonical question should be easy to understand and clear - like an FAQ.
Paraphrases might be less obvious ways of phrasing the same thing.

All annotation methods require authentication.

## Getting annotations

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To retrieve a list of annotations

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/get-annotations' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
annotations = cc.get_annotations()
print(annotations)
```

> Responds with a list of annotations

```shell
{
  "success":true,
  "result":{
    "totalItems":1,
    "items":[
      {
        "id": "a0bee8c2-c3b1-11e7-a7fe-9801a7ae6c69",
        "canonicalQuestion": "How old are you?",
        "documentId": "f2efa8c2-e3b1-12a7-f7fb-9801a7ae6e12",
        "position": {
            "startOffset": 12,
            "endOffset": 24
        },
        "answers":[
            {
                "id": "a67678b6-c3b1-11e7-abaa-9801a7ae6c69",
                "answer": "18"
            }
        ],
        "paraphraseQuestions":[
            {
                "id": "aa8061f6-c3b1-11e7-b59b-9801a7ae6c69",
                "question": "What's your age?"
            },
            {
                "id": "aedfbb18-c3b1-11e7-b7c0-9801a7ae6c69",
                "question": "What age are you?"
            }
        ],
        "created":1508161734,
        "modified":1508161734
      }
    ]
  }
}
```

```python
{
    'totalItems': 1,
    'items': [
        {
            'id': "a0bee8c2-c3b1-11e7-a7fe-9801a7ae6c69",
            'canonicalQuestion': 'How old are you?',
            "documentId": "f2efa8c2-e3b1-12a7-f7fb-9801a7ae6e12",
            "position": {
                "startOffset": 12,
                "endOffset": 24
            },
            'answers': [
                {
                    'id': "a67678b6-c3b1-11e7-abaa-9801a7ae6c69",
                    'answer': '18'
                }
            ],
            'paraphraseQuestions': [
                {
                    'id': "aa8061f6-c3b1-11e7-b59b-9801a7ae6c69",
                    'question': "What's your age?"
                },
                {
                    'id': "aedfbb18-c3b1-11e7-b7c0-9801a7ae6c69",
                    'question': 'What age are you?'
                }
            ],
            'created': 1508161734,
            'modified': 1508161734
        }
    ]
}
```

### Definition

`/api/0.1/annotations/get-annotations` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/get-annotations)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
annotationIds | b496121c-c3b1-11e7-a59d-9801a7ae6c69 | A json list or comma separated list of annotation IDs to return. Returns all annotations by default.
documentIds | e453211f-f3b5-12b4-a59d-1143a7fb6a78 | A json list or comma separated list of document IDs to filter on.
searchTerm | sky | Filter annotations based on whether they contain the search term.
numberOfItems | 5 | The number of annotations to return. Default: 30.
offset | 0 | The starting index in the list of annotations, used in conjunction with numberOfItems to retrieve multiple batches of annotations. Default: 0.

### Result

Returns a list of annotations in reverse chronological order (newest first):

Field | Example | Description
--------- | ------- | -----------
id|b86a4afa-c3b1-11e7-9e98-9801a7ae6c69|The annotation Id.
canonicalQuestion|How old are you?|The main question to identify this annotation.
documentId|e453211f-f3b5-12b4-a59d-1143a7fb6a78|The document that this annotation is associated with.
position||A position object specifying a start offset and end offset.
answers|[{"id": "e953d7a8-c3b1-11e7-ba24-9801a7ae6c69", "answer": "18"}]|A list of saved answers, one of which will be selected at random as the response to the question.
paraphraseQuestions|[{"id": "aedfbb18-c3b1-11e7-b7c0-9801a7ae6c69", "question": "What age are you?"}]|A list of questions which paraphrase the canonical question.
modified|1508161734|Timestamp indicating when this annotation was last modified.
created|1508161734|Timestamp indicating when this annotation was created.

## Creating an annotation

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To create a new annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/add-annotation?question=When%20is%20it%20most%20likely%20to%20snow%3F&answer=In%20the%20winter' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
response = cc.add_annotation('When is it most likely to snow?', 'In the winter', document_id='e453211f-f3b5-12b4-a59d-1143a7fb6a78', start_offset=12, end_offset=40)
print(response)
```

> Responds with the Id of the new annotation

```shell
{
  "success":true,
  "result":{
    "annotationId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69",
    "answerId":"a67678b6-c3b1-11e7-abaa-9801a7ae6c69"
  }
}
```

```python
{
    "annotationId": "f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69",
    "answerId": "a67678b6-c3b1-11e7-abaa-9801a7ae6c69"
}
```

### Definition

`/api/0.1/annotations/add-annotation` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/add-annotation?question=When%20is%20it%20most%20likely%20to%20snow%3F&answer=In%20the%20winter)

Questions (whether Canonical or Paraphrase) must be unique for each document.

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**question**|What colour is the sky?|The canonical question this annotation relates to.
**answer**|Blue|An answer to annotation with when the question is asked.
**documentId**|e453211f-f3b5-12b4-a59d-1143a7fb6a78|The document that this annotation is associated with.
**startOffset**|12|The start of this annotation (for text documents).
**endOffset**|24|The end of this annotation (for text documents).
metadata||A dictionary of user defined information about this annotation.


### Result

Field | Example | Description
--------- | ------- | -----------
annotationId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the new annotation.
answerId|a67678b6-c3b1-11e7-abaa-9801a7ae6c69|The Id of the new answer in the annotation.


## Deleting an annotation

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

Deletes an annotation, and its associated canonical and paraphrase questions.

> To delete an existing annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/delete-annotation?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
annotation_id = cc.delete_annotation("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69")
print(annotation_id)
```

> Responds with the Id of the deleted annotation

```shell
{
  "success":true,
  "result":{
    "annotationId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
  }
}
```

```python
"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/delete-annotation` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/delete-annotation?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**annotationId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the annotation to delete.

### Result

Field | Example | Description
--------- | ------- | -----------
annotationId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the annotation that was deleted.


## Adding paraphrase questions to annotations

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To add a paraphrase question to an existing annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/add-paraphrase-question?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20is%20your%20age?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.add_annotation_paraphrase_question("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69", 'What is your age?')
print(question_id)
```

> Responds with the Id of the new question

```shell
{
  "success":true,
  "result":{
    "questionId":"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
  }
}
```

```python
"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/add-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/add-paraphrase-question?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20is%20your%20age?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**annotationId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the annotation to add a question to.
**question**|What is your age?|The question to add as a paraphase to this annotation.

### Result

Field | Example | Description
--------- | ------- | -----------
questionId|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrased question that was created.


## Deleting an annotation's paraphrase questions

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To delete a paraphrase question

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/delete-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.delete_annotation_paraphrase_question("21e9689e-c3b2-11e7-8a22-9801a7ae6c69")
print(question_id)
```

> Responds with the Id of the deleted question

```shell
{
  "success":true,
  "result":{
    "questionId":"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
  }
}
```

```python
"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/delete-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/delete-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**questionId**|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question to delete

### Result

Field | Example | Description
--------- | ------- | -----------
questionId|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question that was deleted


## Modifying an annotation's paraphrase questions

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To edit an existing paraphrase question

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/edit-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69&question=How%20old%20are%you?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.edit_annotation_paraphrase_question("21e9689e-c3b2-11e7-8a22-9801a7ae6c69", 'How old are you?')
print(question_id)
```

> Responds with the Id of the edited question

```shell
{
  "success":true,
  "result":{
    "questionId":"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
  }
}
```

```python
"21e9689e-c3b2-11e7-8a22-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/edit-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/edit-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69&question=How%20old%20are%20you?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**questionId**|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question to modify.
**question**|What age are you?|The updated question text to use for this paraphrase.

### Result

Field | Example | Description
--------- | ------- | -----------
questionId|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question that was modified.


## Modifying an annotation's canonical question

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To modify an annotation's canonical question

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/edit-canonical-question?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20age%20are%20you?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
annotation_id = cc.edit_annotation_canonical_question("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69", 'What age are you?')
print(annotation_id)
```

> Responds with the Id of the modified annotation

```shell
{
  "success":true,
  "result":{
    "annotationId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
  }
}
```

```python
"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/edit-canonical-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/edit-canonical-question?annotationId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%age%20are%20you?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**annotationId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the annotation to modify.
**question**|What age are you?|The updated canonical question text to use for this annotation.

### Result

Field | Example | Description
--------- | ------- | -----------
annotationId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the annotation that was modified.


## Adding answers to annotations

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To add an additional answer to an existing annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/add-answer?annotationId=68c445cc-c3b2-11e7-8a88-9801a7ae6c69&answer=Grey' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
answer_id = cc.add_annotation_answer("68c445cc-c3b2-11e7-8a88-9801a7ae6c69", 'Grey')
print(answer_id)
```

> Responds with the Id of the new answer

```shell
{
  "success":true,
  "result":{
    "answerId":"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
  }
}
```

```python
"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/add-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/add-answer?annotationId=68c445cc-c3b2-11e7-8a88-9801a7ae6c69&answer=Grey)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**annotationId**|68c445cc-c3b2-11e7-8a88-9801a7ae6c69|The Id of the annotation to add an answer to
**answer**|Grey|The new answer to add to this annotation

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was added


## Deleting answers from annotations

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To delete an answer from an annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/delete-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
answer_id = cc.delete_annotation_answer("703acab4-c3b2-11e7-b8b1-9801a7ae6c69")
print(answer_id)
```

> Responds with the Id of the deleted answer

```shell
{
  "success":true,
  "result":{
    "answerId":"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
  }
}
```

```python
"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
```

Saved replies can have more than one answer. When the annotation is matched, an answer is chosen
at random from the valid answers.

It is only possible to delete answers if more than one answer currently exists.

Attempting to delete the last remaining answer in an annotation will result in an error.

### Definition

`/api/0.1/annotations/delete-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/delete-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**answerId**|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer to delete.

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was deleted.


## Modifying an annotation's answers

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To edit an answer of an existing annotation

```shell
curl 'https://responder.thecape.ai/api/0.1/annotations/edit-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69&answer=Blue' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
answer_id = cc.edit_answer("703acab4-c3b2-11e7-b8b1-9801a7ae6c69", 'Blue')
print(answer_id)
```

> Responds with the Id of the modified answer

```shell
{
  "success":true,
  "result":{
    "answerId":"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
  }
}
```

```python
"703acab4-c3b2-11e7-b8b1-9801a7ae6c69"
```

### Definition

`/api/0.1/annotations/edit-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/annotations/edit-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69&answer=Blue)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**answerId**|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer to modify
**answer**|Blue|The updated answer text to use for this annotation

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was modified
