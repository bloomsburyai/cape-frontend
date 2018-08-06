import os
from sanic.config import LOGGING

# Remove file and syslog logging, handled from stdout
LOGGING['handlers'].pop('errorTimedRotatingFile', None)
LOGGING['handlers'].pop('accessTimedRotatingFile', None)
LOGGING['handlers'].pop('accessSysLog', None)
LOGGING['handlers'].pop('errorSysLog', None)

# Remove redundant logs
LOGGING['loggers']['network']['handlers'] = ['accessStream']
LOGGING['loggers']['sanic']['handlers'] = ['internal']
# TODO : need to stdout logs :
# LOGGING['loggers']['application'] = {'level': 'DEBUG', 'handlers': ['sentry']}
LOGGING['root'] = {'handlers': ['errorStream']}

THIS_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__)))
STATIC_FOLDER = os.path.join(THIS_FOLDER, 'static')
HTML_INDEX_STATIC_FILE = os.path.join(STATIC_FOLDER, 'index.html')
INTERNAL_API_DOC_FOLDER = os.path.join(STATIC_FOLDER, 'documentation')


def envint(varname: str, default: int) -> int:
    return int(os.getenv(varname, default))


# SERVER configuration
CONFIG_SERVER = dict(
    host=os.getenv("CAPE_FRONTEND_HOST", "0.0.0.0"),
    port=envint("CAPE_WEBSERVICE_PORT", 5051),
    debug=True, workers=1, log_config=LOGGING,
)

HOSTNAME = os.getenv('HOSTNAME')
BACKENDS_API_URL = ['http://localhost:5050/api']
CREATE_DEMO_ACCOUNT_ON_INIT = os.getenv("CAPE_FRONTEND_CREATE_DEMO_ACCOUNT_ON_INIT", "True").lower() == 'true'
WAIT_FOR_BACKENDS = os.getenv("CAPE_FRONTEND_WAIT_FOR_BACKENDS", "True").lower() == 'true'
# requires bash,wget and unzip :
ACTIVATE_NGROK_LINUX = os.getenv("CAPE_FRONTEND_ACTIVATE_NGROK_LINUX", "True").lower() == 'true'

DEMO_USER_LOGIN = 'demo'
DEMO_USER_TOKEN = 'demo'
DEMO_USER_PASSWORD = 'REPLACEME'
BACKEND_SUPER_ADMIN_TOKEN = 'REPLACEME'
