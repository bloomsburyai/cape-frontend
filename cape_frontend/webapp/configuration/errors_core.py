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
