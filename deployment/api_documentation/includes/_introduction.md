# Introduction

[Cape](http://github.com/bloomsburyai/cape-webservices) from the now defunct [Bloomsbury AI](http://bloomsbury.ai) is an open source project that provides an API that makes it easy to build software that answers questions about the contents of documents.
For example, you can use Cape to:

* Build a super-powered ctrl+f that finds the answer to questions like 'Who is the CTO?', rather than just all the occurrences of a keyword;
* Build an expressive query tool for textual data - extract features with a single question;
* Build a virtual office assistant that answers routine questions through Slack; and
* Build an add-on to your private search that mimics Google's 'direct answers'.

You can communicate with Cape either directly over HTTP or using our Python client library. To install the Python client simply run:

``pip3 install cape-client``

# Backend service - API Server

This documentation is for version 0.1 of the API.
You need to launch the webservice backend that will provide the API, more info [here](https://github.com/bloomsburyai/cape-webservices#standalone-webapp-with-docker).
In this documentation we will refer to the location of the backend server as : `http://localhost:5050/`

#Frontend service - Management dashboard UI 

You can run the frontend service that hosts this documentation and a management and dashboard UI.
The frontend server also provides a handy mock API to tests your integrations.
In this documentation we will refer to the location of the frontend server as : `http://localhost:5051/`
