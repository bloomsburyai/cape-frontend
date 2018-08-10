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


