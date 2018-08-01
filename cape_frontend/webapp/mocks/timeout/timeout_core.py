from sanic import Blueprint
from sanic.response import text as textify
from cape_frontend.webapp.mocks.timeout.timeout_settings import URL_BASE
from cape_api_helpers.text_responses import *
import asyncio
mock_timeout_endpoints = Blueprint('mock_timeout_endpoints')

_endpoint_route = lambda x:mock_timeout_endpoints.route(URL_BASE + x, methods=['GET', 'POST'])


@_endpoint_route('/<tag>')
@_endpoint_route('/user/<tag>')
@_endpoint_route('/inbox/<tag>')
@_endpoint_route('/saved-replies/<tag>')
@_endpoint_route('/documents/<tag>')
async def _all(request,tag):
    await asyncio.sleep(86400)
    return textify(ERROR_TEXT)


