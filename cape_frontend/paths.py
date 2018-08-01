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
