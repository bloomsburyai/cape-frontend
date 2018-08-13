module.exports = {
  backend: {
    url: 'http://localhost:5050/api/0.1'             // Modified automatically at release
  },
  frontend: {
    url: 'http://localhost:8080'              // Modified automatically at release
  },
  mock: {
    full: {
      url: 'http://localhost:8080/mock/full/api/0.1'               // Modified automatically at release
    },
    unlucky: {
      url: 'http://localhost:8080/mock/unlucky/api/0.1'               // Modified automatically at release
    },
    error: {
      url: 'http://localhost:8080/mock/error/api/0.1'               // Modified automatically at release
    },
    timeout: {
      url: 'http://localhost:8080/mock/timeout/api/0.1'               // Modified automatically at release
    }
  }
}
