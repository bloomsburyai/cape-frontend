from sanic import Blueprint
from sanic.response import json as jsonify
from cape_frontend import version
from functools import partial
from cape_frontend import cape_frontend_settings
from cape_api_helpers.headers import generate_cors_headers

configuration_endpoints = Blueprint('configuration_endpoints')
_endpoint_route = partial(configuration_endpoints.route, methods=['GET', 'POST'])


@_endpoint_route('/status')
async def _version(request):
    return jsonify({'version': version.VERSION, 'name': version.NAME,
                    'hostname': cape_frontend_settings.HOSTNAME,
                    'port': cape_frontend_settings.CONFIG_SERVER['port'],
                    }, headers=generate_cors_headers(request))
