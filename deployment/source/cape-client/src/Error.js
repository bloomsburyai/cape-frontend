/* eslint-disable no-proto */

// Custom error that works on IE ( :) ).
// Solution taken from:
// https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
function ClientError (message, type) {
  let instance = new Error(message)
  instance.type = type
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  return instance
}

ClientError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
if (Object.setPrototypeOf) {
  Object.setPrototypeOf(ClientError, Error)
} else {
  ClientError.__proto__ = Error
}

// Build error from library preset
ClientError.fromObject = function (fields) {
  return new ClientError(fields.message, fields.type)
}

// Error preset library to
// be used with "fromObject"
ClientError.library = {
  timeout: {
    message: 'Timeout value exceeded. Please try again later.',
    type: 'timeout'
  },
  unknown: {
    message: 'An unknown error occured. Please try again later.',
    type: 'unknown'
  },
  failedConnection: {
    message: 'Unable to connect to backend. To specify a backend URL at runtime append the configuration URL paramater: http://yourfrontend.com/?configuration={"api": {"backendURL": "http://yourbackend.com:5050"} }',
    type: 'failedConnection'
  },
  malformedResponse: {
    message: 'Malformed response.',
    type: 'malformedResponse'
  },
  notFound: {
    message: 'Not found.',
    type: 'notFound'
  },
  server: {
    message: '',
    type: 'server'
  }
}

export default ClientError
