import secrets
import json
from functools import wraps

from sanic import Blueprint
from sanic.response import json as jsonify
from sanic.response import text as textify

from cape_frontend.webapp.logs.logs_core import log
from cape_api_helpers.exceptions import UserException
from cape_api_helpers.text_responses import *
from cape_api_helpers.headers import generate_cors_headers

mocks_endpoints = Blueprint('mocks')

_SESSION_COOKIE_NAME = 'session'
_SESSION_COOKIE_EXPIRES = 2592000
_SESSION_BYTE_SIZE = 32

_MUST_BE_GET_PARAM = {'admintoken', 'token'}  # because these are used in routing, post are not allowed
# Google and facebook require query parameters to be specified in advance in the allowed refer list, so we only accept
# these as POST parameters
_MUST_BE_POST_PARAM = {'successcallback', 'errorcallback'}


def respond_with_json(decorated):
    @wraps(decorated)
    def wrapper(request, *args, **kw):
        status = 200
        try:
            result = decorated(request, *args, **kw)
        except UserException as user_exception:
            log("User exception in mock: %s" % user_exception.message, request=request, exc_info=True)
            status = 500
            result = {'success': False, 'result': {'message': user_exception.message}}
        except json.JSONDecodeError:
            log(ERROR_INVALID_JSON, request=request, exc_info=True)
            status = 500
            result = {'success': False, 'result': {'message': ERROR_INVALID_JSON}}
        except Exception:
            log("Exception in mock", request=request, exc_info=True)
            status = 500
            result = {'success': False, 'result': {'message': ERROR_TEXT}}
        if 'success' not in result:
            result = {'success': True, 'result': result}
        return jsonify(result, status=status, headers=generate_cors_headers(request))

    return wrapper


def insert_new_session(request):
    request['session'] = secrets.token_urlsafe(_SESSION_BYTE_SIZE)


def delete_current_session(request):
    if 'session' in request:
        del request['session']


def _is_sanic_static(response) -> bool:
    """Determine if the request headers correspond to a static sanic resource"""
    if isinstance(response, list):
        return False
    return response.status == 304 or 'Last-Modified' in response.headers


@mocks_endpoints.middleware('response')
async def _save_session(request, response):
    if _is_sanic_static(response):
        return
    if 'session' in request:
        log('setting cookie')
        response.cookies[_SESSION_COOKIE_NAME]: str = request['session']
        response.cookies[_SESSION_COOKIE_NAME]['expires'] = _SESSION_COOKIE_EXPIRES
        response.cookies[_SESSION_COOKIE_NAME]['httponly'] = True
    elif 'session' not in request and _SESSION_COOKIE_NAME in request.cookies:
        log('deleting cookie')
        response.cookies[_SESSION_COOKIE_NAME] = ''
        response.cookies[_SESSION_COOKIE_NAME]['expires'] = 0
        response.cookies[_SESSION_COOKIE_NAME]['max-age'] = 0


@mocks_endpoints.middleware('request')
async def _before_request(request):
    sid = request.cookies.get(_SESSION_COOKIE_NAME, False)
    if sid:
        request['session'] = sid


@mocks_endpoints.middleware('request')
async def _preflight_cors(request):
    """Respond to preflight CORS requests and load parameters."""
    if request.method == "OPTIONS":
        return textify("ok", headers=generate_cors_headers(request))
    request['args'] = {}
    if request.form:
        for key in request.form:
            key_lower = key.lower()
            if key_lower in _MUST_BE_GET_PARAM:
                raise UserException(CANNOT_BE_POST_PARAM % key)
            request['args'][key_lower] = request.form[key][0]
    elif request.json:
        for key in request.json:
            key_lower = key.lower()
            if key_lower in _MUST_BE_GET_PARAM:
                raise UserException(CANNOT_BE_POST_PARAM % key)
            # Make all url parameters strings
            if isinstance(request.json[key], list):
                request['args'][key_lower] = json.dumps(request.json[key])
            else:
                request['args'][key_lower] = str(request.json[key])
    # Take all Get parameters
    for key, value in list(request.raw_args.items()):
        key_lower = key.lower()
        if key_lower in _MUST_BE_POST_PARAM:
            raise UserException(CANNOT_BE_GET_PARAM % key)
        request['args'][key_lower] = value


def requires_auth(wrapped):
    @wraps(wrapped)
    def decorated(request, *args, **kwargs):
        if 'session' not in request and 'admintoken' not in request['args']:
            raise UserException(NOT_LOGGED_TEXT)
        return wrapped(request, *args, **kwargs)

    return decorated
