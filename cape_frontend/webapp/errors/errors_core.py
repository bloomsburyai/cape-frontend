# Copyright 2018 BLEMUNDSBURY AI LIMITED
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
