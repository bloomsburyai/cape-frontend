from sanic import Blueprint
from sanic.response import redirect
from sanic.exceptions import NotFound, ServerError, RequestTimeout
from sanic.response import text as textify

from functools import partial

errors_endpoints = Blueprint('errors_endpoints')

_endpoint_route = partial(errors_endpoints.route, methods=['GET', 'POST'])


@errors_endpoints.exception(NotFound)
async def _404(request, exception):
    return redirect('404.html')


@errors_endpoints.exception(ServerError)
async def _500(request, exception):
    return redirect('500.html')


@errors_endpoints.exception(RequestTimeout)
async def _timeout(request, exception):
    return textify('RequestTimeout from error_handler.', 408)


@_endpoint_route('/kaboom')
async def _kaboom(request):
    return 1 / 0
