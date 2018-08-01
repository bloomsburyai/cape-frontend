from typing import Union
from sanic import Sanic
from cape_frontend import cape_frontend_settings
from cape_frontend.webapp.logs.logs_core import log
from cape_frontend.webapp.configuration.configuration_core import configuration_endpoints
from cape_frontend.webapp.errors.errors_core import errors_endpoints
from cape_frontend.webapp.mocks.full.full_core import mock_full_endpoints
from cape_frontend.webapp.mocks.mocks_core import mocks_endpoints
from cape_frontend.webapp.mocks.unlucky.unlucky_core import mock_unlucky_endpoints
from cape_frontend.webapp.mocks.timeout.timeout_core import mock_timeout_endpoints
from cape_frontend.webapp.mocks.error.error_core import mock_error_endpoints

app = Sanic(__name__)
app.blueprint(mock_timeout_endpoints)
app.blueprint(mock_error_endpoints)
app.static('/', file_or_directory=cape_frontend_settings.STATIC_FOLDER)
app.static('/', file_or_directory=cape_frontend_settings.HTML_INDEX_STATIC_FILE)
app.blueprint(errors_endpoints)
app.blueprint(configuration_endpoints)
app.blueprint(mocks_endpoints)
app.blueprint(mock_unlucky_endpoints)
app.blueprint(mock_full_endpoints)

print("listing endpoints", app.router.routes_all.keys())


def run(port: Union[None, int] = None):
    if port is not None:
        cape_frontend_settings.CONFIG_SERVER['port'] = int(port)
    log("Using port", cape_frontend_settings.CONFIG_SERVER['port'])
    app.run(**cape_frontend_settings.CONFIG_SERVER)
