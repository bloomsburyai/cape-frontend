# Answer
The answer endpoint answers by reading saved replies and documents.

## Answering questions

<aside class="notice">
    Requires  either :
    <ul>
        <li>A token retrieved via the <a href='#user-token-authentication'>/get-user-token</a> endpoint; </li>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To ask the question "what is the colour of the sky ?"

```shell
curl 'http://localhost:5050/api/0.1/answer?token=08aerv08ajkdp&question=what+is+the+colour+of+the+sky+?'
```

```python
from cape.client import CapeClient

cc = CapeClient()
answers = cc.answer('what is the colour of the sky ?',
                    user_token='08aerv08ajkdp')
print(answers)
```

> Returns the answer

```shell
{
  "success": true,
  "result": {
    "items": [
      {
        "answerText": "blue",
        "answerContext": "to only the lower, more dense portions of the atmosphere.\n\nDuring daylight, the sky appears to be blue because air scatters more blue sunlight than red.[1][2][3][4]",
        "confidence": 0.73,
        "sourceType": "document",
        "sourceId": "e6451353a0a008b4e2366691e8eff687e4ce6ef28552898d8bbe8be84f4b3ec3",
        "answerTextStartOffset": 706,
        "answerTextEndOffset": 710,
        "answerContextStartOffset": 608,
        "answerContextEndOffset": 772
      }
    ]
  }
}
```

```python
[
      {
        "answerText": "blue",
        "answerContext": "to only the lower, more dense portions of the atmosphere.\n\nDuring daylight, the sky appears to be blue because air scatters more blue sunlight than red.[1][2][3][4]",
        "confidence": 0.73,
        "sourceType": "document",
        "sourceId": "e6451353a0a008b4e2366691e8eff687e4ce6ef28552898d8bbe8be84f4b3ec3",
        "answerTextStartOffset": 706,
        "answerTextEndOffset": 710,
        "answerContextStartOffset": 608,
        "answerContextEndOffset": 772
      }
]
```

### Definition

`/api/0.1/answer` [Mock example](http://localhost:5051/mock/full/api/0.1/answer?token=08aerv08ajkdp&question=Is%20this%20API%20easy%20to%20use?)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**token** | 08aerv08ajkdp | The token retrieved from [/get-user-token](#user-token-authentication)
**question** | What colour is the sky? | The question to ask.
text | "The sky is blue" | Optional inline text to be treated as a temporary document with id 'Inline Text'
threshold | low | The minimum confidence of answers to return. Can be one of 'veryhigh', 'high', 'medium', 'low', 'verylow'.
documentIds | document_1, document_2 or ["document_1","document_2"] | A json list or comma separated list of document ids to search within for answers. By default searches all documents.
sourceType | document | Whether to search documents, saved replies or both. Can be one of 'document', 'saved_reply' or 'all'. Default: 'all'.
speedOrAccuracy | speed | Prioritise speed or accuracy in answers. Can be one of 'speed', 'accuracy' or 'balanced'. Default: 'balanced'.
numberOfItems | 5 | The number of answers to return. Default: 1.
offset | 0 | The starting index for the list of answers. If this value is '2', and 'numberOfItems' is '5', then answers 2 to 5 will be returned. Default: 0.


### Result

Returns a list of answers:

<aside class="notice">
Unlike other lists <i>answer</i> doesn't provide a <i>totalItems</i> count.
</aside>

Field | Example | Description
--------- | ------- | -----------
answerText | blue | The proposed answer to the question.
answerContext | to only the lower, more dense portions of the atmosphere.During daylight, the sky appears to be blue because air scatters more blue sunlight than red.\[1\]\[2\]\[3\]\[4\] | The context surrounding the proposed answer (if sourceType is 'document').
confidence | 0.73 | The confidence score of this response, should only be used to sort results and not as probability.
sourceType | document | Whether this result came from a document or a saved reply. Can be either 'document' or 'saved_reply'.
sourceId | document_123 | The Id of the document or saved reply this answer was found in (depending on sourceType).
answerTextStartOffset | 706 | The first character of the answer. As an index in the document, starting at 0. (if sourceType is 'document').
answerTextEndOffset | 710 | The last character of the answer. As an index in the document, starting at 0. (if sourceType is 'document').
answerContextStartOffset | 608 | The first character of the context. As an index in the document, starting at 0. (if sourceType is 'document').
answerContextEndOffset | 772 | The last character of the context. As an index in the document, starting at 0. (if sourceType is 'document').
matchedQuestion | What are the opening hours ? | The original question that matched the provided question. (if sourceType is 'saved_reply').