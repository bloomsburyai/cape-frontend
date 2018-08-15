# Inbox

## Fetching a user's inbox

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To retrieve the currently logged in user's inbox

```shell
curl 'http://localhost:5050/api/0.1/inbox/get-inbox' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
inbox = cc.get_inbox()
print(inbox)
```

> Returns the following list of inbox items

```shell
{
  "success":true,
  "result":{
    "totalItems":2,
    "items":[
      {
        "id":"4124",
        "answered":false,
        "read":false,
        "question":"Who are you?",
        "questionSource":"API",
        "created":1508162032,
        "answers":[]
      },
      {
        "id":"4123",
        "answered":true,
        "read":false,
        "question":"How easy is the API to use?",
        "questionSource":"API",
        "created":1508161834,
        "answers":[
          {
            "answerText":"Hopefully it's pretty easy",
            "answerContext":"in the instructions. Hopefully it's pretty easy. We think that then you can ",
            "confidence":0.75,
            "sourceType":"document",
            "sourceId":"358e1b77c9bcc353946dfe107d6b32ff",
            "answerTextStartOffset":30,
            "answerTextEndOffset":56,
            "answerContextStartOffset":17,
            "answerContextEndOffset":98
          }
        ]
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
            'id': '4124',
            'answered': False,
            'read': False,
            'question': 'Who are you?',
            'questionSource': 'API',
            'created': 1508162032,
            'answers': []
        },
        {
            'id': '4123',
            'answered': True,
            'read': False,
            'question': 'How easy is the API to use?',
            'questionSource': 'API',
            'created': 1508161834,
            'answers': [
                {
                    "answerText":"Hopefully it's pretty easy",
                    "answerContext":"in the instructions. Hopefully it's pretty easy. We think that then you can ",
                    "confidence":0.75,
                    "sourceType":"document",
                    "sourceId":"358e1b77c9bcc353946dfe107d6b32ff",
                    "answerTextStartOffset":30,
                    "answerTextEndOffset":56,
                    "answerContextStartOffset":17,
                    "answerContextEndOffset":98
                }
            ]
        }
    ]
}
```

### Definition

`/api/0.1/inbox/get-inbox` [Mock example](http://localhost:5051/mock/full/api/0.1/inbox/get-inbox)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
read | false | Filter messages based on whether they have been read. Can be 'true', 'false' or 'both'. Default: 'both'.
answered | true | Filter messages based on whether they have been answered. Can be 'true', 'false' or 'both'. Default: 'both'.
searchTerm | sky | Filter messages based on whether they contain the search term. By default there is no filter.
numberOfItems | 5 | The number of inbox items to return. Default: 30.
offset | 0 | The starting index in the list of inbox items, so if the starting index is 1 and 'numberOfItems' is 5, items 1-6 will be returned. Default: 0.

### Result

Returns a list of inbox items in reverse chronological order (newest first):

Field | Example | Description
--------- | ------- | -----------
id|5a3f6a28-c3b1-11e7-8087-9801a7ae6c69|Unique Id for this inbox item
question|What colour is the sky?|The question that a user asked
read|false|Whether this item has been read
answered|true|Whether an answer could be found for this question
answers| |A list of answers as returned by [/answers](#answering-questions) endpoint
created|1508162032|Timestamp indicating when this question was asked


## Mark an inbox item read

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via <a href='#admin-token-authentication'>get-admin-token</a>; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To mark an inbox item as having been read

```shell
curl 'http://localhost:5050/api/0.1/inbox/mark-inbox-read?inboxId=123' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
inbox_id = cc.mark_inbox_read("7e94dfae-c3b1-11e7-a15b-9801a7ae6c69")
print(inbox_id)
```

> Responds with the inboxId that was marked as being read

```shell
{
  "success":true,
  "result":{
    "inboxId":"7e94dfae-c3b1-11e7-a15b-9801a7ae6c69"
  }
}
```

```python
"7e94dfae-c3b1-11e7-a15b-9801a7ae6c69"
```

### Definition

`/api/0.1/inbox/mark-inbox-read` [Mock example](http://localhost:5051/mock/full/api/0.1/inbox/mark-inbox-read?inboxId=7e94dfae-c3b1-11e7-a15b-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**inboxId**|7e94dfae-c3b1-11e7-a15b-9801a7ae6c69|The inbox item to mark as being read.

### Result

Field | Example | Description
--------- | ------- | -----------
inboxId|7e94dfae-c3b1-11e7-a15b-9801a7ae6c69|The inbox item that was marked as read.


## Archiving an inbox item

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via <a href='#admin-token-authentication'>get-admin-token</a>; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To move an inbox item to the archive

```shell
curl 'http://localhost:5050/api/0.1/inbox/archive-inbox?inboxId=7e94dfae-c3b1-11e7-a15b-9801a7ae6c69' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
inbox_id = cc.archive_inbox("7e94dfae-c3b1-11e7-a15b-9801a7ae6c69")
print(inbox_id)
```

> Responds with the inboxId that was archived

```shell
{
  "success":true,
  "result":{
    "inboxId":"7e94dfae-c3b1-11e7-a15b-9801a7ae6c69"
  }
}
```

```python
"7e94dfae-c3b1-11e7-a15b-9801a7ae6c69"
```

### Definition

`/api/0.1/inbox/archive-inbox` [Mock example](http://localhost:5051/mock/full/api/0.1/inbox/archive-inbox?inboxId=7e94dfae-c3b1-11e7-a15b-9801a7ae6c69)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**inboxId**|7e94dfae-c3b1-11e7-a15b-9801a7ae6c69|The inbox item to archive.

### Result

Field | Example | Description
--------- | ------- | -----------
inboxId|7e94dfae-c3b1-11e7-a15b-9801a7ae6c69|The inbox item that was archived.