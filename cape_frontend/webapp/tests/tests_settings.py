import os
from cape_frontend.cape_frontend_settings import CONFIG_SERVER

UI_URL = os.getenv('CAPE_FRONTEND_TEST_URL', f'http://localhost:{CONFIG_SERVER["port"]}')
