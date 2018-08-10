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

import sys
import traceback
import logging

# Handler and logger configured in settings
_APPLICATION_LOGGER = logging.getLogger('application')


def is_sanic_static(response) -> bool:
    """Determine if the request headers correspond to a static sanic resource"""
    if isinstance(response, list):
        return False
    return response.status == 304 or 'Last-Modified' in response.headers


def log(*args, request=None, response=None, level='info', exc_info=False, sample_rate=None, **kwargs):
    print(*args, str(kwargs) if kwargs else '', file=sys.stderr)
    if exc_info:
        print(traceback.format_exc())
