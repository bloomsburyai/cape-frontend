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
