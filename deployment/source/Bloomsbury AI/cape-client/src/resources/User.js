import _ from 'lodash'
import map from '../map'
import Resource from '../Resource'
import ClientError from '../Error'

/**
 *
 * Profile resource
 *
 */

class Profile extends Resource {
  // get retrieves the
  // profile details
  get (callback) {
    const options = this._model.get
    this._request(options, (error, data) => {
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'username') &&
          _.has(data, 'plan') &&
          _.has(data, 'termsAgreed') &&
          _.has(data, 'onboardingCompleted') &&
          _.has(data, 'forwardEmail') &&
          _.has(data, 'forwardEmailVerified')) {
          callback(null, data)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Threshold resource
 *
 */

class Threshold extends Resource {
  // get retrieves the current
  // threshold value that is
  // used by the user
  get (callback) {
    const options = this._model.get
    this._request(options, (error, data) => {
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'threshold')) {
          callback(null, data.threshold)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }

  // set sets a new threshold
  // value that should be used
  // by the user
  set (value, callback) {
    const options = _.extend({
      data: {
        'threshold': value
      }
    }, this._model.set)
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'threshold')) {
          callback(null, data.threshold)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Forward email resource
 *
 */

class ForwardEmail extends Resource {
  // set sets the forwarding email address
  set (value, callback) {
    const method = this._model.set.method
    const path = this._model.set.path
    this._request({
      method: method,
      path: path,
      data: {
        email: value
      }
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'forwardEmail')) {
          callback(null, data.forwardEmail)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Token resource
 *
 */

class Token extends Resource {
  // get retrieves the token
  // value from the backend
  get (callback) {
    const options = this._model.get
    this._request(options, (error, data) => {
      if (error) {
        callback(error, null)
      } else {
        const interests = ['userToken', 'adminToken']
        let interest = ''
        let found = false
        for (let i = 0; i < interests.length; i++) {
          interest = interests[i]
          if (_.has(data, interest)) {
            found = true
            break
          }
        }
        if (found) {
          callback(null, data[interest])
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Plan resource
 *
 */

class Plan extends Resource {
  // set sets a new plan value
  // that should be used by the
  // user
  set (value, callback) {
    const method = this._model.set.method
    const path = this._model.set.path
    const options = {
      method: method,
      path: path,
      data: {
        plan: value
      }
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'plan')) {
          callback(null, data.plan)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Terms resource
 *
 */

class Terms extends Resource {
  // agree marks the user as having
  // agreed to the terms & conditions
  agree (callback) {
    const method = this._model.agree.method
    const path = this._model.agree.path
    const options = {
      method: method,
      path: path
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'termsAgreed')) {
          callback(null, data.termsAgreed)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Onboarding resource
 *
 */

class Onboarding extends Resource {
  // complete marks the user as having
  // completed the onboarding process
  complete (callback) {
    const method = this._model.complete.method
    const path = this._model.complete.path
    const options = {
      method: method,
      path: path
    }
    this._request(options, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        if (_.has(data, 'onboardingCompleted')) {
          callback(null, data.onboardingCompleted)
        } else {
          callback(ClientError.fromObject(
            ClientError.library.malformedResponse
          ), null)
        }
      }
    })
  }
}

/**
 *
 * Statistics resource
 *
 */

class Statistics extends Resource {
  // get retrieves the stats
  get (callback) {
    const method = this._model.get.method
    const path = this._model.get.path
    this._request({
      method: method,
      path: path
    }, (error, data) => {
      if (!callback) {
        return
      }
      if (error) {
        callback(error, null)
      } else {
        callback(null, data)
      }
    })
  }
}

/**
 *
 * User resource
 *
 */

class User extends Resource {
  // constructor
  constructor (client) {
    super(client, map.user)
    this._setupProfile()
    this._setupThreshold()
    this._setupForwardEmail()
    this._setupToken()
    this._setupPlan()
    this._setupTerms()
    this._setupOnboarding()
    this._setupStatistics()
  }

  // _setupProfile declares a "profile" property
  // that enables accessing profile resource methods
  _setupProfile () {
    const model = this._model.profile
    if (!model) {
      return
    }
    this.profile = new Profile(this._client, model)
  }

  // _setupThreshold declares a "threshold" property
  // that facilitates acccess to the threshold resource
  _setupThreshold () {
    const model = this._model.threshold
    if (!model) {
      return
    }
    this.threshold = new Threshold(this._client, model)
  }

  // _setupForwardEmail declares a "forwardEmail" property
  // that facilitates access to the forward email resource
  _setupForwardEmail () {
    const model = this._model.forwardEmail
    if (!model) {
      return
    }
    this.forwardEmail = new ForwardEmail(this._client, model)
  }

  // _setupToken declares a "token" property
  // that enable accessing different token types
  _setupToken () {
    const collection = this._model.token
    if (!collection) {
      return
    }
    this.token = {}
    _.each(collection, (model, key) => {
      this.token[key] = new Token(this._client, model)
    })
  }

  // _setupPlan declares a "plan" property
  // that enables accessing the plan resource
  _setupPlan () {
    const model = this._model.plan
    if (!model) {
      return
    }
    this.plan = new Plan(this._client, model)
  }

  // _setupTerms declares a "terms" property
  // that enables accessint the terms resource
  _setupTerms () {
    const model = this._model.terms
    if (!model) {
      return
    }
    this.terms = new Terms(this._client, model)
  }

  // _setupOnboarding declares a "onboarding" property
  // that enables accessing the onboarding resource
  _setupOnboarding () {
    const model = this._model.onboarding
    if (!model) {
      return
    }
    this.onboarding = new Onboarding(this._client, model)
  }

  // _setupStatistics declares a "statistics" property
  // that enables accessing the statistics resource
  _setupStatistics () {
    const model = this._model.statistics
    if (!model) {
      return
    }
    this.statistics = new Statistics(this._client, model)
  }
}

export default User
