from sanic import Blueprint
from cape_frontend.webapp.mocks.error.error_settings import URL_BASE
from cape_frontend.webapp.mocks.mocks_core import respond_with_json

mock_error_endpoints = Blueprint('mock_error_endpoints')

_endpoint_route = lambda x: mock_error_endpoints.route(URL_BASE + x, methods=['GET', 'POST'])


@_endpoint_route('/<tag>')
@_endpoint_route('/user/<tag>')
@_endpoint_route('/inbox/<tag>')
@_endpoint_route('/saved-replies/<tag>')
@_endpoint_route('/documents/<tag>')
@respond_with_json
def _all(request, tag):
    raise Exception("There was an intended error processing this request.")
