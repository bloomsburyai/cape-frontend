from sanic import Blueprint
from sanic.response import redirect
from sanic.exceptions import NotFound, RequestTimeout
from sanic.response import text as textify
from sanic.response import json as jsonify

from cape_api_helpers.exceptions import UserException
from cape_api_helpers.headers import generate_cors_headers

from functools import partial

from cape_frontend.webapp.logs.logs_core import log

errors_endpoints = Blueprint('errors_endpoints')

_endpoint_route = partial(errors_endpoints.route, methods=['GET', 'POST'])


@errors_endpoints.exception(NotFound)
def _404(request, exception):
    log('404', request=request, exc_info=True)
    return redirect('/404.html')


@errors_endpoints.exception(RequestTimeout)
def _timeout(request, exception):
    return textify('RequestTimeout from error_handler.', 408)


@errors_endpoints.exception(Exception)
def _500(request, exception):
    log('500', request=request, exc_info=True)
    if exception.__class__ is UserException:
        log("User exception: %s" % exception.message, request=request, exc_info=True)
        message = exception.message
        return jsonify({'success': False, 'result': {'message': message}}, status=500,
                       headers=generate_cors_headers(request))
    return redirect('/500.html')


@_endpoint_route('/kaboom')
async def _kaboom(request):
    return 1 / 0
