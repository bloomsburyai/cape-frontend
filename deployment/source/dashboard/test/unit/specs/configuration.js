import globalConfiguration from '../../../../configuration'

/**
 *
 * Test configurations
 *
 */

const TOKEN_ADMIN_VALUE = '29186dba-b589-11e7-97a4-9801a7ae6c69'
const TOKEN_QUERY_VALUE = '08aerv08ajkdp'

export const EMPTY = {
  backendURL: '',
  timeout: 99999,
  token: {
    admin: TOKEN_ADMIN_VALUE,
    query: TOKEN_QUERY_VALUE
  }
}

export const FULL = {
  backendURL: globalConfiguration.mock.full.url,
  timeout: 99999,
  token: {
    admin: TOKEN_ADMIN_VALUE,
    query: TOKEN_QUERY_VALUE
  }
}

export const UNLUCKY = {
  backendURL: globalConfiguration.mock.unlucky.url,
  timeout: 99999,
  token: {
    admin: TOKEN_ADMIN_VALUE,
    query: TOKEN_QUERY_VALUE
  }
}

export const ERROR = {
  backendURL: globalConfiguration.mock.error.url,
  timeout: 99999,
  token: {
    admin: TOKEN_ADMIN_VALUE,
    query: TOKEN_QUERY_VALUE
  }
}

export const TIMEOUT = {
  backendURL: globalConfiguration.mock.timeout.url,
  timeout: 3000,
  token: {
    admin: TOKEN_ADMIN_VALUE,
    query: TOKEN_QUERY_VALUE
  }
}
