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
    print(*args, str(kwargs), file=sys.stderr)
    if exc_info:
        print(traceback.format_exc())
