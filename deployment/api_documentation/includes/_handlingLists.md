# Handling results with lists

Many methods return lists of items. Where possible we've provided a consistent
interface to all lists. Any method that returns a list will accept the 
parameters *numberOfItems* and *offset*. These can be used to retrieve items
from a list in batches.

When a method returns a list it will typically also provide a key called 
*totalItems* which specifies the complete number of items available 
(not just the specific number requested in this call).

Using these pieces of information, you can choose which items are returned.
For example, if there are 100 responses, you can get the last 5 items by
setting *numberOfItems* to 5, and *offset* to 95.

> To fetch just the first item from the inbox

```shell
curl 'https://responder.thecape.ai/api/0.1/inbox/get-inbox?numberOfItems=1' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
inbox = cc.get_inbox(number_of_items=1)
print(inbox)
```

> This returns the first item, but also informs us that there are two items in total

```shell
{
  "success":true,
  "result":{
    "totalItems":6,
    "items":[
      {
        "id":"4124",
        "answered":false,
        "read":false,
        "question":"Who are you?",
        "questionSource":"API",
        "created":1508162032,
        "answers":[]
      }
    ]
  }
}
```

```python
{
    'totalItems': 6,
    'items':[
        {
            'id': '4124',
            'answered': False,
            'read': False,
            'question': 'Who are you?',
            'questionSource': 'API',
            'created': 1508162032,
            'answers': []
        }
    ]
}
```

> We can try to fetch the next 5 items

```shell
curl 'https://responder.thecape.ai/api/0.1/inbox/get-inbox?numberOfItems=5&offset=1' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
inbox = cc.get_inbox(number_of_items=5, offset=1)
print(inbox)
```

> Because there are only a total of two items available this just returns the second item

```shell
{
  "success":true,
  "result":{
    "totalItems":2,
    "items":[
      {
        "id":"4123",
        "answered":true,
        "read":false,
        "question":"How easy is the API to use?",
        "questionSource":"API",
        "created":1508161834,
        "answers":[
          {
            "text":"Hopefully it's pretty easy",
            "confidence":0.75,
            "sourceType":"document",
            "sourceId":"358e1b77c9bcc353946dfe107d6b32ff",
            "startOffset":30,
            "endOffset":56
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
            'id': '4123',
            'answered': True,
            'read': False,
            'question': 'How easy is the API to use?',
            'questionSource': 'API',
            'created': 1508161834,
            'answers': [
                {
                    'text': "Hopefully it's pretty easy",
                    'confidence': 0.75,
                    'sourceType': 'document',
                    'sourceId': '358e1b77c9bcc353946dfe107d6b32ff',
                    'startOffset': 30,
                    'endOffset': 56
                }
            ]
        }
    ]
}
```