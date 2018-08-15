
# Mock services

In additional to the genuine API service we provide four mock services which can be used to assist with testing.
None of these mock services has any permanent effect and will always return the same responses, making them suitable for
inclusion in your own unit tests.

Each endpoint in the mock services corresponds to what an operation would return in a real setting. Each mock method
returns an example of the output you could expect to see from the real API.

## Full mock service

> The full mock service returns complete output for a call:

```json
{
  "success":true,
  "result":{
    "totalItems":2,
    "items":[
      {
        "id":"custom_id_2",
        "title":"document2.txt",
        "origin":"document2.txt",
        "text":"This is another document.",
        "type":"file",
        "created":1508169352,
        "modified":1508169352
      },
      {
        "id":"358e1b77c9bcc353946dfe107d6b32ff",
        "title":"cape_api.txt",
        "origin":"cape_api.txt",
        "text":"Welcome to the Cape API 0.1. Hopefully it's pretty easy to use.",
        "type":"text",
        "created":1508161723,
        "modified":1508161723
      }
    ]
  }
}
```

The full mock service is available at [https://ui.thecape.ai/mock/full/api/0.1/](https://ui.thecape.ai/mock/full/api/0.1/).
It aims at giving responses describing "full" cases, this might include :

* For a `login` endpoint : The login credentials are valid.
* For a `search` endpoint : A full page of results is returned.
* For an `answer question` endpoint : An answer is returned .


## Unlucky mock service

> The unlucky mock service returns a different type of failure for each method:

```json
{
  "success":false,
  "result": {
      "message":"A reply for the question 'Test?' already exists."
  }
}
```

The unlucky mock service is available at [https://ui.thecape.ai/mock/unlucky/api/0.1/](https://ui.thecape.ai/mock/unlucky/api/0.1/).
It aims at giving responses describing "unlucky" cases, this might include :

* for a `login` endpoint : The login credentials are invalid,
* for a `search` endpoint : No search results,
* for an `answer question` endpoint : No answer found,
* for a `document upload` endpoint : A document already exists with that Id, or
* for a `delete` endpoint : The item being deleted does not exist.

These may or may not produce a `"success": false` response, depending on the call. (For example a failed upload would
return false, but an empty search response would be successful just without any results in the list.)

These are useful for checking how your code handles errors.

## Error mock service

> The error mock service returns the same error for all methods:

```json
{
    "success":false,
    "result":{
      "message":"Something went wrong while processing the request."
    }
}
```

The error mock service is available at [https://ui.thecape.ai/mock/error/api/0.1/](https://ui.thecape.ai/mock/error/api/0.1/).
It aims at giving responses describing "server error" cases, this always returns the same response from all endpoints.

## Timeout mock service

> The timeout mock service never returns a response

```json

```

The timeout mock service is available at [https://ui.thecape.ai/mock/timeout/api/0.1/](https://ui.thecape.ai/mock/timeout/api/0.1/).
It aims at simulating a server hanging and never returning a response, this always has the same behaviour from all endpoints.
