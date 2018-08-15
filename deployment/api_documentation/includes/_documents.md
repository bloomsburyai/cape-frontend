# Documents

## Getting documents

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via <a href='#admin-token-authentication'>get-admin-token</a></li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To retrieve a list of documents

```shell
curl 'https://responder.thecape.ai/api/0.1/documents/get-documents' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
documents = cc.get_documents()
print(documents)
```

> Responds with a list of documents

```shell
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

```python
{
    'totalItems': 2,
    'items': [
        {
            'id': 'custom_id_2',
            'title': 'document2.txt',
            'origin': 'document2.txt',
            'text': 'This is another document.',
            'type': 'file',
            'created': 1508161723,
            'modified': 1508161723
        },
        {
            'id': '358e1b77c9bcc353946dfe107d6b32ff',
            'title': 'cape_api.txt',
            'origin': 'cape_api.txt',
            'text': "Welcome to the Cape API 0.1. Hopefully it's pretty easy to use.",
            'type': 'text',
            'created': 1508161723,
            'modified': 1508161723
        }
    ]
}
```

### Definition

`/api/0.1/documents/get-documents` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/documents/get-documents)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
documentIds | 358e1b77c9bcc353946dfe107d6b32ff | A json list or comma separated list of document Ids to return. By default returns all documents.
numberOfItems | 5 | The number of documents to return. Default: 30.
offset | 0 | The start index of the list of documents. For example, if this is '2', then the returned documents omits the first two documents. (Default: 0)

### Result

Returns a list of documents in reverse chronological order (newest first):

Field | Example | Description
--------- | ------- | -----------
id | 358e1b77c9bcc353946dfe107d6b32ff | The Id of this document
title | API Documentation | The document's title (specified at upload).
origin | cape_api.txt | Where this document originally came from.
text | Welcome to the Cape API 0.1. Hopefully it's pretty easy to use. | The contents of the document.
type | text | Whether this document was created by inputting text or uploading a file. Possible options 'text' or 'file'.
created | 1508161723 | Timestamp of when this document was first uploaded.
modified | 1508161723 | Timestamp of when this document was last modified.


## Uploading a document

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method</li>
    </ul>
</aside>

> To upload a new documents

```shell
curl 'https://responder.thecape.ai/api/0.1/documents/add-document?title=Example%20document&text=This%20is%20an%20example.&origin=example.txt' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
document_id = cc.add_document(title="Example document",
                                 text="This is an example.",
                                 origin="example.txt")
print(document_id)
```

> Responds with the Id of the new document

```shell
{
  "success":true,
  "result":{
    "documentId":"4e2fc0c58f973ddd4ace0de85a5ebba9b88cc35df80d8c455c6079726075d3bf"
  }
}
```

```python
'4e2fc0c58f973ddd4ace0de85a5ebba9b88cc35df80d8c455c6079726075d3bf'
```

### Definition

`/api/0.1/documents/add-document` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/documents/add-document?title=Example%20document&text=This%20is%20an%20example.&origin=example.txt)

### Input

Input parameters in bold are required, all other parameters are optional. In the case of **text** and **file**, one or the other is required, not both.

Field | Example | Description
--------- | ------- | -----------
**title**|Example document|The title to give the new document.
documentId|my_document.txt|The ID to give the new document. Default: An SHA256 hash of the document contents.
origin|my_document.txt|Where the document came from. Default: The document's filename when performing a file upload, otherwise empty.
***text***|Welcome to my document.|The plain text contents of the document. Either *text* or *file* must be supplied.
***file***| |A file POSTed as multipart/form-data. Either *text* or *file* must be supplied.
replace|true|If true and a document already exists with the same documentId it will be overwritten with the new upload. If false an error is returned when a documentId already exists. Default: false.
type|text|Whether this document was created by inputting text or uploading a file. Can be either 'text' or 'file'. Default: text.

### Result

Field | Example | Description
--------- | ------- | -----------
documentId|my_document.txt|The Id of the new document.


## Deleting a document

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To delete an existing document

```shell
curl 'https://responder.thecape.ai/api/0.1/documents/delete-document?documentId=358e1b77c9bcc353946dfe107d6b32ff' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
document_id = cc.delete_document('358e1b77c9bcc353946dfe107d6b32ff')
print(document_id)
```

> Responds with the Id of the deleted document

```shell
{
  "success":true,
  "result":{
    "documentId":"358e1b77c9bcc353946dfe107d6b32ff"
  }
}
```

```python
'358e1b77c9bcc353946dfe107d6b32ff'
```

### Definition

`/api/0.1/documents/delete-document` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/documents/delete-document?documentId=358e1b77c9bcc353946dfe107d6b32ff)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**documentId**|358e1b77c9bcc353946dfe107d6b32ff|The Id of the document to delete

### Result

Field | Example | Description
--------- | ------- | -----------
documentId|358e1b77c9bcc353946dfe107d6b32ff|The Id of the document that was deleted