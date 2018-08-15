# User - Configuration

## Getting the default threshold

    If a threshold parameter isn't specified when calling the [*answer*](#answers) endpoint a default threshold is used.

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To get the current default threshold

```shell
curl 'http://localhost:5050/api/0.1/user/get-default-threshold' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
default_threshold = cc.get_default_threshold()
print(default_threshold)
```

> Responds with the default threshold

```shell
{
  "success":true,
  "result":{
    "threshold":"medium"
  }
}
```

```python
"medium"
```

### Definition

`/api/0.1/user/get-default-threshold` [Mock example](http://localhost:5051/mock/full/api/0.1/user/get-default-threshold)

### Input

None

### Result

Field | Example | Description
--------- | ------- | -----------
threshold | medium | The current default threshold, either 'verylow', low', 'medium', 'high' or 'veryhigh'.


## Setting the default threshold

If a threshold parameter isn't specified when calling the [*answer*](#answers) endpoint a default threshold is used.

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To set a new default threshold

```shell
curl 'http://localhost:5050/api/0.1/user/set-default-threshold?threshold=high' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
default_threshold = cc.set_default_threshold("high")
print(default_threshold)
```

> Responds with the new default threshold

```shell
{
  "success":true,
  "result":{
    "threshold":"high"
  }
}
```

```python
"high"
```

### Definition

`/api/0.1/user/set-default-threshold` [Mock example](http://localhost:5051/mock/full/api/0.1/user/set-default-threshold?threshold=high)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**threshold** | high | The new default threshold to set, must be either 'verylow', 'low', 'medium', 'high' or 'veryhigh'.

### Result

Field | Example | Description
--------- | ------- | -----------
threshold | high | The new default threshold that's just been set.

## Setting the forward email address

If a forwarding email is set users can send emails to '&lt;token&gt;@thecape.ai' (where 'token' is the user token) and receive a response by email.

When an answer isn't found an email is sent to the forward email address with the top three suggestions from Cape to assist a human expert in providing the correct response, when the experts replies the answer is stored as a saved reply to answer similar future questions.

<aside class="notice">
    To enable this functionality, after a forward email address is set, we will send by email an activation link to verify ownership.
</aside>

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To set a new forward email address

```shell
curl 'http://localhost:5050/api/0.1/user/set-forward-email?email=test@bloomsbury.ai' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
forward_email = cc.set_forward_email("test@bloomsbury.ai")
print(forward_email)
```

> Responds with the new forward email address

```shell
{
  "success":true,
  "result":{
    "forwardEmail":"test@bloomsbury.ai"
  }
}
```

```python
"test@bloomsbury.ai"
```

### Definition

`/api/0.1/user/set-forward-email` [Mock example](http://localhost:5051/mock/full/api/0.1/user/set-forward-email?email=test@bloomsbury.ai)

### Input

Input parameters in bold are required, all other parameters are optional.

Field | Example | Description
--------- | ------- | -----------
**email** | test@bloomsbury.ai | The new forward email address to set.

### Result

Field | Example | Description
--------- | ------- | -----------
email | test@bloomsbury.ai | The new forward email address that has just been set.


## Getting the user profile

<aside class="notice">
    Requires  either :
    <ul>
        <li>An admin token retrieved via the <a href='#admin-token-authentication'>get-admin-token</a> endpoint; or</li>
        <li>A logged session enabled via any <a href='#user-authentication'>Authentication</a> method.</li>
    </ul>
</aside>

> To get the current user's profile

```shell
curl 'http://localhost:5050/api/0.1/user/get-profile' \
    -b 'session=<your session id>'
```

```python
from cape.client import CapeClient

cc = CapeClient()
cc.login('blo', 'bla')
print(cc.get_profile())
```

> Responds with the user profile

```shell
{
  "success":true,
  "result":{
    "username":"test@bloomsbury.ai",
    "plan":"free",
    "termsAgreed":false,
    "onboardingCompleted":false,
    "forwardEmail":"test@bloomsbury.ai",
    "forwardEmailVerified": false
  }
}
```

```python
{
    "username":"test@bloomsbury.ai",
    "plan":"free",
    "termsAgreed":False,
    "onboardingCompleted":True,
    "forwardEmail":"test@bloomsbury.ai",
    "forwardEmailVerified": False
  }
```

### Definition

`/api/0.1/user/get-profile` [Mock example](http://localhost:5051/mock/full/api/0.1/user/get-profile)

### Input

None

### Result

Field | Example | Description
--------- | ------- | -----------
username | test@bloomsbury.ai | The currently logged in user's username.
plan | pro | The plan selected by the user, can be "free","basic" and "pro".
termsAgreed | false | Whether or not we need to display the "Terms and Conditions" banner.
onboardingCompleted | false | Whether or not the onboarding process was completed.
forwardEmail | test@bloomsbury.ai | When using emails, the address to forward emails which Cape was unable to answer automatically. For more info click <a href='#setting-the-forward-email-address'>here</a>.
forwardEmailVerified | false | Whether or not the forward email has been verified. For more info click <a href='#setting-the-forward-email-address'>here</a>.