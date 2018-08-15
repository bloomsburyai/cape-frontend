# Saved replies

Saved replies are made up of a pair consisting of a canonical question and
the response it should produce. In addition to the canonical question a
saved reply may have many paraphrased questions associated with it which
should produce the same answer (e.g. "How old are you?" vs "What is your age?").

The canonical question should be easy to understand and clear - like an FAQ. Paraphrases might be less
obvious ways of phrasing the same thing.

All saved reply methods require authentication.

## Getting saved replies

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To retrieve a list of saved replies

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/get-saved-replies' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
saved_replies = cc.get_saved_replies()
print(saved_replies)
```

> Responds with a list of saved replies

```shell
{
  "success":true,
  "result":{
    "totalItems":2,
    "items":[
      {
        "id":"a0bee8c2-c3b1-11e7-a7fe-9801a7ae6c69",
        "canonicalQuestion":"How old are you?",
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
      },
      {
        "id":"b496121c-c3b1-11e7-a59d-9801a7ae6c69",
        "canonicalQuestion":"What colour is the sky?",
        "answers":[
            {
                "id": "b86a4afa-c3b1-11e7-9e98-9801a7ae6c69",
                "answer": "Blue"
            }
        ],
        "created":1508161323,
        "modified":1508161323
      }
    ]
  }
}
```

```python
{
    'totalItems': 2,
    'items': [
        {
            'id': "a0bee8c2-c3b1-11e7-a7fe-9801a7ae6c69",
            'canonicalQuestion': 'How old are you?',
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
        },
        {
            'id': "b496121c-c3b1-11e7-a59d-9801a7ae6c69",
            'canonicalQuestion': 'What colour is the sky?',
            'answers': [
                {
                    'id': "b86a4afa-c3b1-11e7-9e98-9801a7ae6c69",
                    'answer': 'Blue'
                }
            ],
            'paraphraseQuestions': [],
            'created': 1508161323,
            'modified': 1508161323
        }
    ]
}
```

### Definition

`/api/0.1/saved-replies/get-saved-replies` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/get-saved-replies)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
savedReplyIds | b496121c-c3b1-11e7-a59d-9801a7ae6c69 | A json list or comma separated list of saved reply Ids to return. Returns all saved replies by default.
searchTerm | sky | Filter saved replies based on whether they contain the search term.
numberOfItems | 5 | The number of saved replies to return. Default: 30.
offset | 0 | The starting index in the list of saved replies, used in conjunction with numberOfItems to retrieve multiple batches of saved replies. Default: 0.

### Result

Returns a list of saved replies in reverse chronological order (newest first):

Field | Example | Description
--------- | ------- | -----------
id|b86a4afa-c3b1-11e7-9e98-9801a7ae6c69|The reply Id
canonicalQuestion|How old are you?|The main question to identify this saved reply
answers|[{"id": "e953d7a8-c3b1-11e7-ba24-9801a7ae6c69", "answer": "18"}]|A list of saved answers, one of which will be selected at random as the response to the question.
paraphraseQuestions|[{"id": "aedfbb18-c3b1-11e7-b7c0-9801a7ae6c69", "question": "What age are you?"}]|A list of questions which paraphrase the canonical question
modified|1508161734|Timestamp indicating when this saved reply was last modified
created|1508161734|Timestamp indicating when this saved reply was created

## Creating a saved reply

<aside class="notice">
    Requires either:
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To create a new saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/add-saved-reply?question=When%20is%20it%20most%20likely%20to%20snow%3F&answer=In%20the%20winter' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
response = cc.add_saved_reply('When is it most likely to snow?', 'In the winter')
print(response)
```

> Responds with the Id of the new saved reply

```shell
{
  "success":true,
  "result":{
    "replyId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69",
    "answerId":"a67678b6-c3b1-11e7-abaa-9801a7ae6c69"
  }
}
```

```python
{
    "replyId": "f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69",
    "answerId": "a67678b6-c3b1-11e7-abaa-9801a7ae6c69"
}
```

### Definition

`/api/0.1/saved-replies/add-saved-reply` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/add-saved-reply?question=When%20is%20it%20most%20likely%20to%20snow%3F&answer=In%20the%20winter)

Questions (whether Canonical or Paraphrase) must be unique.

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**question**|What colour is the sky?|The canonical question this saved reply relates to.
**answer**|Blue|An answer to reply with when the question is asked.

### Result

Field | Example | Description
--------- | ------- | -----------
replyId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the new saved reply.
answerId|a67678b6-c3b1-11e7-abaa-9801a7ae6c69|The Id of the new answer in the saved reply.


## Deleting a saved reply

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

Deletes a saved reply, and its associated canonical and paraphrase questions.

> To delete an existing saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/delete-saved-reply?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
reply_id = cc.delete_saved_reply("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69")
print(reply_id)
```

> Responds with the Id of the deleted reply

```shell
{
  "success":true,
  "result":{
    "replyId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
  }
}
```

```python
"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
```

### Definition

`/api/0.1/saved-replies/delete-saved-reply` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/delete-saved-reply?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**replyId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the saved reply to delete.

### Result

Field | Example | Description
--------- | ------- | -----------
replyId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the saved reply that was deleted.


## Adding paraphrase questions

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To add a paraphrase question to an existing saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/add-paraphrase-question?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20is%20your%20age?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.add_paraphrase_question("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69", 'What is your age?')
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

`/api/0.1/saved-replies/add-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/add-paraphrase-question?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20is%20your%20age?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**replyId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the saved reply to add a question to
**question**|What is your age?|The question to add as a paraphase to this saved reply

### Result

Field | Example | Description
--------- | ------- | -----------
questionId|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrased question that was created


## Deleting paraphrase questions

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To delete a paraphrase question

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/delete-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.delete_paraphrase_question("21e9689e-c3b2-11e7-8a22-9801a7ae6c69")
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

`/api/0.1/saved-replies/delete-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/delete-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**questionId**|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question to delete

### Result

Field | Example | Description
--------- | ------- | -----------
questionId|21e9689e-c3b2-11e7-8a22-9801a7ae6c69|The Id of the paraphrase question that was deleted


## Modifying paraphrase questions

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To edit an existing paraphrase question

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/edit-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69&question=How%20old%20are%you?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
question_id = cc.edit_paraphrase_question("21e9689e-c3b2-11e7-8a22-9801a7ae6c69", 'How old are you?')
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

`/api/0.1/saved-replies/edit-paraphrase-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/edit-paraphrase-question?questionId=21e9689e-c3b2-11e7-8a22-9801a7ae6c69&question=How%20old%20are%20you?)

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


## Modifying canonical questions

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To modify a saved reply's canonical question

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/edit-canonical-question?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%20age%20are%20you?' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
reply_id = cc.edit_canonical_question("f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69", 'What age are you?')
print(reply_id)
```

> Responds with the Id of the modified saved reply

```shell
{
  "success":true,
  "result":{
    "replyId":"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
  }
}
```

```python
"f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69"
```

### Definition

`/api/0.1/saved-replies/edit-canonical-question` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/edit-canonical-question?replyId=f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69&question=What%age%20are%20you?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**replyId**|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the saved reply to modify.
**question**|What age are you?|The updated canonical question text to use for this saved reply.

### Result

Field | Example | Description
--------- | ------- | -----------
replyId|f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69|The Id of the saved reply that was modified.


## Adding answers

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To add an additional answer to an existing saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/add-answer?replyId=68c445cc-c3b2-11e7-8a88-9801a7ae6c69&answer=Grey' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
answer_id = cc.add_answer("68c445cc-c3b2-11e7-8a88-9801a7ae6c69", 'Grey')
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

`/api/0.1/saved-replies/add-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/add-answer?replyId=68c445cc-c3b2-11e7-8a88-9801a7ae6c69&answer=Grey)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**replyId**|68c445cc-c3b2-11e7-8a88-9801a7ae6c69|The Id of the saved reply to add an answer to
**answer**|Grey|The new answer to add to this saved reply

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was added


## Deleting answers

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To delete an answer from a saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/delete-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
answer_id = cc.delete_answer("703acab4-c3b2-11e7-b8b1-9801a7ae6c69")
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

Saved replies can have more than one answer. When the saved reply is matched, an answer is chosen
at random from the valid answers.

It is only possible to delete answers if more than one answer currently exists.

Attempting to delete the last remaining answer in a saved reply will result in an error.

### Definition

`/api/0.1/saved-replies/delete-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/delete-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**answerId**|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer to delete.

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was deleted.


## Modifying answers

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To edit an answer of an existing saved reply

```shell
curl 'https://responder.thecape.ai/api/0.1/saved-replies/edit-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69&answer=Blue' \
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

`/api/0.1/saved-replies/edit-answer` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/saved-replies/edit-answer?answerId=703acab4-c3b2-11e7-b8b1-9801a7ae6c69&answer=Blue)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**answerId**|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer to modify
**answer**|Blue|The updated answer text to use for this saved reply

### Result

Field | Example | Description
--------- | ------- | -----------
answerId|703acab4-c3b2-11e7-b8b1-9801a7ae6c69|The Id of the answer that was modified