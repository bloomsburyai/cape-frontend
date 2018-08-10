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

from .inbox import inbox
from .saved_replies import saved_replies
from .documents import documents
from .answers import answers
from .annotations import annotations


empty_answer = [
    {
        "text": "Sorry, I don't know the answer to that.",
        "sourceType": "not_found"
    }
]


username = 'test@bloomsbury.ai'


user_token = '08aerv08ajkdp'


admin_token = '29186dba-b589-11e7-97a4-9801a7ae6c69'
