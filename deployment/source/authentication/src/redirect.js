import _ from 'lodash'
import client from '@/client'
import configuration from '@/configuration'
import URI from 'urijs'

client.user.token.query.get(function (error, data) {
  if (!error && configuration.authentication.login.redirectURL) {
    const uri = new URI()
    const query = uri.search(true)
    if (_.has(query, 'redirect_uri') && _.has(query, 'account_linking_token')) {
      window.location.href = configuration.authentication.login.redirectURL + '?redirect_uri=' + query.redirect_uri + '&account_linking_token=' + query.account_linking_token
    } else {
      window.location.href = configuration.authentication.login.redirectURL
    }
  }
})
