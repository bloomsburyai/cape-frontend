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

from cape_frontend.webapp.tests.tests_settings import UI_URL
import pytest
import requests

_ERROR_REDIRECTION_LOCATION = '/500.html'
_NOT_FOUND_REDIRECTION_LOCATION = '/404.html'
_REACHABLE_ENDPOINTS = [
    "/",
    "/index.html",
    _NOT_FOUND_REDIRECTION_LOCATION,
    _ERROR_REDIRECTION_LOCATION,
    "/status",
    "/internal_documentation/index.html"
]


@pytest.mark.parametrize("endpoint", _REACHABLE_ENDPOINTS)
def test_reachable(endpoint):
    session = requests.Session()
    response = session.get(UI_URL + endpoint)
    assert response.status_code == 200


@pytest.mark.parametrize("endpoint_location", [
    ("/kaboom", _ERROR_REDIRECTION_LOCATION),
    ("/HolaCapitan", _NOT_FOUND_REDIRECTION_LOCATION),
])
def test_error_redirection(endpoint_location):
    endpoint, redirection = endpoint_location
    session = requests.Session()
    response = session.get(UI_URL + endpoint, allow_redirects=False)
    assert response.status_code == 302
    assert response.headers['Location'] == redirection
