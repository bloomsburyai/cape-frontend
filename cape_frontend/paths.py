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

"""Script to print out paths used by the server"""

import argparse
from cape_frontend import cape_frontend_settings


def print_internal():
    print(cape_frontend_settings.INTERNAL_API_DOC_FOLDER, end="", flush=True)

def print_static():
    print(cape_frontend_settings.STATIC_FOLDER, end="", flush=True)

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description=__doc__)
    # If user doesn't specify an input file, read from standard input. Since
    # encodings are the worst thing, we're explicitly expecting std
    parser.add_argument('--internal-api-path', dest='print_internal', action='store_const',
                        const=True, default=False,
                        help='Print the internal API path')
    parser.add_argument('--static', dest='print_static', action='store_const',
                        const=True, default=False,
                        help='Print the web static files path')
    return parser.parse_args()

def main():
    args = parse_args()
    if args.print_internal:
        print_internal()
    if args.print_static:
        print_static()
if __name__ == "__main__":
    main()
