/**
 *
 * API path & method map
 *
 */

const METHOD_GET = 'get'
const METHOD_POST = 'post'

module.exports = {
  // Authentication
  authentication: {
    login: {
      path: '/user/login',
      method: METHOD_GET
    },
    logout: {
      path: '/user/logout',
      method: METHOD_GET
    },
    platform: {
      facebook: {
        login: {
          path: '/user/facebook-oauth2callback',
          method: METHOD_POST
        }
      },
      google: {
        login: {
          path: '/user/google-oauth2callback',
          method: METHOD_POST
        }
      }
    }
  },
  // User
  user: {
    profile: {
      get: {
        path: '/user/get-profile',
        method: METHOD_GET
      }
    },
    threshold: {
      get: {
        path: '/user/get-default-threshold',
        method: METHOD_GET
      },
      set: {
        path: '/user/set-default-threshold',
        method: METHOD_POST
      }
    },
    token: {
      query: {
        get: {
          path: '/user/get-user-token',
          method: METHOD_GET
        }
      },
      admin: {
        get: {
          path: '/user/get-admin-token',
          method: METHOD_GET
        }
      }
    }
  },
  // Inbox
  inbox: {
    paginate: {
      path: '/inbox/get-inbox',
      method: METHOD_POST
    },
    markAsRead: {
      path: '/inbox/mark-inbox-read',
      method: METHOD_POST
    },
    archive: {
      path: '/inbox/archive-inbox',
      method: METHOD_POST
    }
  },
  // Reply
  reply: {
    paginate: {
      path: '/saved-replies/get-saved-replies',
      method: METHOD_POST
    },
    create: {
      path: '/saved-replies/add-saved-reply',
      method: METHOD_POST
    },
    read: {
      path: '/saved-replies/get-saved-replies',
      method: METHOD_POST
    },
    delete: {
      path: '/saved-replies/delete-saved-reply',
      method: METHOD_POST
    },
    question: {
      paraphrase: {
        create: {
          path: '/saved-replies/add-paraphrase-question',
          method: METHOD_POST
        },
        update: {
          path: '/saved-replies/edit-paraphrase-question',
          method: METHOD_POST
        },
        delete: {
          path: '/saved-replies/delete-paraphrase-question',
          method: METHOD_POST
        }
      },
      canonical: {
        update: {
          path: '/saved-replies/edit-canonical-question',
          method: METHOD_POST
        }
      }
    },
    answer: {
      create: {
        path: '/saved-replies/add-answer',
        method: METHOD_POST
      },
      update: {
        path: '/saved-replies/edit-answer',
        method: METHOD_POST
      },
      delete: {
        path: '/saved-replies/delete-answer',
        method: METHOD_POST
      }
    }
  },
  // Document
  document: {
    paginate: {
      path: '/documents/get-documents',
      method: METHOD_POST
    },
    create: {
      path: '/documents/add-document',
      method: METHOD_POST
    },
    read: {
      path: '/documents/get-documents',
      method: METHOD_POST
    },
    delete: {
      path: '/documents/delete-document',
      method: METHOD_POST
    }
  },
  // Query
  query: {
    paginate: {
      path: '/answer',
      method: METHOD_POST
    }
  }
}
