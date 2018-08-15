# User - Authentication

Most API endpoints require authentication, there are three primary ways to authenticate:

- Login authentication: Proves that the user has gone through login and can build his own AI.
  * Cape login : A login given by the cape team,
  * Google login: Use your Google credentials to login,
  * Facebook login: User your Facebook credentials to login
- Admin token authentication: Alternative mechanism for proving that the user has been given authorisation to build their own AI.
- User token authentication: Proves that an AI builder has given the authorisation of usage to a third user.

To sign up for a new account visit our [registration page](https://ui.thecape.ai/authentication.html#/register).

## Cape login authentication

Login authentication provides both a cookie session Id and the current admin token. Either can be used to authenticate future commands,
either by providing the cookie as part of the future requests or by passing the admin token via the *adminToken* parameter.

> To obtain a cookie session Id:

```shell
curl -v "https://responder.thecape.ai/api/0.1/user/login?login=username&password=password"
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
```

> This returns the session Id

```shell
GET /api/0.1/user/login?login=username&password=password HTTP/1.1
Host: localhost:5050
User-Agent: curl/7.43.0
Accept: */*
>
HTTP/1.1 200 OK
Connection: keep-alive
Keep-Alive: 60
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token
Set-Cookie: session=YRLGcYs3-PpBIa-PT8Q_c1OH6uKXrSYY9UvXnsbZapA; Path=/; expires=2592000; HttpOnly
Content-Length: 124
Content-Type: application/json
<
* Connection #0 to host localhost left intact
```

> Although not needed, the session Id is returned for **indicative** purposes

```shell
{
  "success":true,
  "result":{
    "message":"Valid credentials supplied",
    "sessionId":"YRLGcYs3-PpBIa-PT8Q_c1OH6uKXrSYY9UvXnsbZapA"
    "adminToken":"29186dba-b589-11e7-97a4-9801a7ae6c69"
  }
}
```

When logging in, a cookie with the necessary session Id is returned.
With this cookie all following requests can be authenticated.

### Definition

`/api/0.1/user/login`

[Mock example](https://ui.thecape.ai/mock/full/api/0.1/user/login?login=username&password=password)


### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**login** | username | The login of the user.
**password** | password | The password of the user.

### Result

Field | Example | Description
--------- | ------- | -----------
message | Valid credentials supplied | A message describing the success of the credential validation.
sessionId | ja9ev-a98ere-da | A session Id (for indicative purposes only, defined as a cookie).
adminToken | 29186dba-b589-11e7-97a4-9801a7ae6c69 | The current admin token which can be passed as a parameter instead of cookie-based authentication.

## Google authentication

Google authentication provides a cookie session Id after the user correctly logs in with a Google account.
The user will be redirected to a supplied URL after authentication.

### Definition

`/api/0.1/user/google-oauth2callback`


### Input

Input parameters in bold are required, all other parameters are optional.

All parameters for this request must be provided via **POST**.

Field | Example | Description
--------- | ------- | -----------
**successCallback** | https://ui.thecape.ai | URL to redirect the user to after correct authentication.
**errorCallback** | https://ui.thecape.ai/error | URL to redirect the user to after an error in authentication.


### Result

A cookie will be created and the user will be redirected to the supplied URL.


## Facebook authentication

Facebook authentication provides a cookie session Id after the user correctly logs in with a Facebook account.
The user will be redirected to a supplied URL after authentication.

### Definition

`/api/0.1/user/facebook-oauth2callback`

### Input

Input parameters in bold are required, all other parameters are optional.

All parameters for this request must be provided via POST.

Field | Example | Description
--------- | ------- | -----------
**successCallback** | https://ui.thecape.ai | URL to redirect the user to after correct authentication.
**errorCallback** | https://ui.thecape.ai/error | URL to redirect the user to after an error in authentication.


### Result

A cookie will be created and the user will be redirected to the supplied URL.

## Admin token authentication

<aside class="notice">
    Requires previous session authentication.
</aside>

In addition to being provided as part of the *login* endpoint, the admin token can be requested at any time via */user/get-admin-token*.


> To obtain the current admin token

```shell
curl 'https://responder.thecape.ai/api/0.1/user/get-admin-token' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('username', 'password')
print(cc.get_admin_token())
```

> Responds with the admin token

```shell
{
  "success":true,
  "result":{
    "adminToken":"29186dba-b589-11e7-97a4-9801a7ae6c69"
  }
}
```

> This token can then be used to make further requests without doing a cookie based login

```shell
curl 'https://responder.thecape.ai/api/0.1/user/get-profile?adminToken=29186dba-b589-11e7-97a4-9801a7ae6c69'
```

```python
from cape.client import CapeClient

cc = CapeClient(admin_token="29186dba-b589-11e7-97a4-9801a7ae6c69")
print(cc.get_profile())
```

The admin token must be passed as a GET parameter.

### Definition

`/api/0.1/user/get-admin-token`
[Mock example](https://ui.thecape.ai/mock/full/api/0.1/user/get-admin-token)

### Input

None

### Result

Field | Example | Description
--------- | ------- | -----------
adminToken | 29186dba-b589-11e7-97a4-9801a7ae6c69 | The current admin token which can be passed as a parameter instead of cookie based authentication.

All methods which require authentication will accept the admin token via the *adminToken* **GET** parameter instead of a
cookie based authentication.


## User token authentication

<aside class="notice">
    Requires previous session authentication.
</aside>

> To obtain the user token. The user token is used for authenticating the 'answer' method.

```shell
curl 'https://responder.thecape.ai/api/0.1/user/get-user-token' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('username', 'password')
token = cc.get_user_token()
print(token)
```

> This returns the token

```shell
{
  "success":true,
  "result":{
            "userToken":"08aerv08ajkdp"
            }
 }
```

```python
'08aerv08ajkdp'
```
The returned user token can then be used to interact with the Cape AI's [*answer*](#answers) endpoint.

The user token must be passed as a **GET** parameter.

### Definition

`/api/0.1/user/get-user-token` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/user/get-user-token)

### Input

None

### Result

Field | Example | Description
--------- | ------- | -----------
userToken | j89hvfv89s| A token that gives the holder access to only the /answer endpoint.



## Logout

> To logout

```shell
curl -v "https://responder.thecape.ai/api/0.1/user/logout" \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient
cc = CapeClient()
cc.login('blo', 'bla')
print("Logged in:", cc.logged_in())
cc.logout()
print("Logged in:", cc.logged_in())
```

> This will delete the cookie and invalidate the session in the backend

```shell
GET /mock/full/api/0.1/user/logout HTTP/1.1
Host: localhost:5050
User-Agent: curl/7.43.0
Accept: */*
Cookie: session=aijvaoerare09vjaer90jva09r
>
HTTP/1.1 200 OK
Connection: keep-alive
Keep-Alive: 60
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token
Set-Cookie: session=""; Path=/; expires=0; Max-Age=0
Content-Length: 43
Content-Type: application/json
<
* Connection #0 to host localhost left intact
```

> Producing the following output

```shell
{
  "success":true,
  "result":{
            "message":"User logged out"
            }
 }
```

```python
Logged in: True
Logged in: False
```

This operation will log the user out.

### Definition

`/api/0.1/user/logout` [Mock example](https://ui.thecape.ai/mock/full/api/0.1/user/logout)


### Input

None

### Result

Field | Example | Description
--------- | ------- | -----------
message | User logged out | A message confirming the operation