# User - Creation and Deletion

When the Google and Facebook account logins are disabled (default behaviour).
The only way to add new users is by using the SUPER ADMIN endpoints and providing the SUPER ADMIN token.
This token has to configured when launching the backend, it is by default `REPLACEME`

## Cape SUPER ADMIN - Creating a new account

To create a new account provide, the super admin token, the login, password and optionally the user token for the new user.
Please note that the login and user token need to be unique or you will get an error.

> To create a new user:

```shell
curl -v "http://localhost:5050/api/0.1/user/create-user?userId=login&password=password&token=token&superAdminToken=REPLACEME"
```

> This returns the username on success

```shell
> GET /api/0.1/user/create-user?userId=login&password=password&token=token&superAdminToken=REPLACEME HTTP/1.1
> Host: localhost:5050
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Connection: keep-alive
< Keep-Alive: 600
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS
< Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token
< Content-Length: 46
< Content-Type: application/json
<
* Connection #0 to host localhost left intact
{"success":true,"result":{"username":"login"}}
```



### Definition

`/api/0.1/user/create-user`

No Mock example for this endpoint.

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**userId** | mylogin | The login of the user.
**password** | mypassword | The password of the user.
**superAdminToken** | REPLACEME | The super admin token of the backend.
token| mytoken | The user token of the user.

### Result

Field | Example | Description
--------- | ------- | -----------
username | mylogin | For indicative purposes the login of the new user.

## Cape SUPER ADMIN - Deleting an existing account

To delete a user account provide, the super admin token, the existing user login.
Please note that the login must exist or you will get an error.
Please note that all the user data, including documents, annotations and saved replies will be permanently deleted.

> To delete an existing user:

```shell
curl -v "http://localhost:5050/api/0.1/user/delete-user?userId=login&superAdminToken=REPLACEME"
```

> This returns the username on success

```shell
> GET /api/0.1/user/delete-user?userId=login&superAdminToken=REPLACEME HTTP/1.1
> Host: localhost:5050
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Connection: keep-alive
< Keep-Alive: 600
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS
< Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token
< Content-Length: 46
< Content-Type: application/json
<
* Connection #0 to host localhost left intact
{"success":true,"result":{"username":"login"}}
```



### Definition

`/api/0.1/user/delete-user`

No Mock example for this endpoint.

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**userId** | mylogin | The login of the user to delete.
**superAdminToken** | REPLACEME | The super admin token of the backend.

### Result

Field | Example | Description
--------- | ------- | -----------
username | mylogin | For indicative purposes the login of the successfully deleted user.

