import client from '@/client'
import configuration from '@/configuration'

if (process && process.env && process.env.NODE_ENV === 'production') {
  client.user.token.query.get((error, data) => {
    if (error && configuration.authentication.failure.redirectURL) {
      window.location.href = configuration.authentication.failure.redirectURL
    }
  })
}
