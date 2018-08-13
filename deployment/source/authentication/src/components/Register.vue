<style scoped lang="scss">
  .cape-authentication-register {
    width: 416px;
  }
</style>

<template>
  <div class="cape-authentication-register">

    <!-- Panel -->

    <div class="panel">
      <div class="panel-inner">

        <!-- Header -->

        <div class="panel-header">
          <h4 class="primary">Sign up</h4>
          <h4 class="secondary">Create a Cape account.</h4>
        </div>

        <!-- End header -->

        <!-- Alerts -->

        <template v-if="hasOAuthError">
          <div class="alert alert-danger text-center">
            {{ OAUTH_ERROR }}
          </div>
        </template>
        <template v-if="error !== ''">
          <div class="alert alert-danger text-center">
            {{ error }}
          </div>
        </template>
        <template v-if="redirect">
          <div class="alert alert-success text-center">
            Account created successfully. Redirecting to sign in page
          </div>
        </template>

        <!-- End alerts -->

        <!-- Body -->

        <div class="panel-body">
          <div class="form-group">
            <input
              v-model="register"
              type="text"
              class="form-control"
              placeholder="Username">
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password">
          </div>
          <div class="form-group">
            <input
              v-model="superadmintoken"
              v-on:keyup.enter="submit"
              type="password"
              class="form-control"
              placeholder="Super Admin Token">
          </div>
          <button
            v-on:click="submit"
            v-bind:disabled="progress"
            type="submit"
            class="btn btn-block btn-primary">
            <template v-if="!progress">
              Register
            </template>
            <template v-else>
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            </template>
          </button>
        </div>

        <!-- End body -->

      </div>
    </div>

    <!-- End panel -->

    <!-- Footer -->

    <div class="footer">
      <p>
        Already have an account?
        <a href="#/login" class="link link-primary">Sign in</a>
      </p>
    </div>

    <!-- End footer -->

  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client.js'
import configuration from '@/configuration.js'

const OAUTH_ERROR = 'We were unable to create your account.'

export default {

  data: function () {
    return {
      OAUTH_ERROR: OAUTH_ERROR,
      register: '',
      password: '',
      superadmintoken: '',
      progress: false,
      error: '',
      redirect: false
    }
  },

  computed: {
    hasOAuthError () {
      if (_.has(this.$route, 'params.error')) {
        return this.$route.params.error
      }
      return false
    }
  },

  methods: {
    submit: function () {
      client.authentication.register({
        username: this.register,
        password: this.password,
        superadmintoken: this.superadmintoken
      }, _.bind(function (error, data) {
        this.progress = false
        if (error) {
          this.error = error.message
          return
        }
        this.redirect = true
        if (configuration.authentication.register.redirectURL) {
          window.location.href = configuration.authentication.register.redirectURL
        }
      }, this))
      this.progress = true
      this.error = ''
      this.redirect = false
    },
    social (option) {
      const successRedirectURL = configuration.authentication.oauth.success.redirectURL
      const errorRedirectURL = configuration.authentication.oauth.error.redirectURL
      if (!(successRedirectURL && errorRedirectURL)) {
        return
      }
      switch (option) {
        case 'facebook':
          client.authentication.platform.facebook.login({
            successRedirectURL: successRedirectURL,
            errorRedirectURL: errorRedirectURL
          })
          break
        case 'google':
          client.authentication.platform.google.login({
            successRedirectURL: successRedirectURL,
            errorRedirectURL: errorRedirectURL
          })
          break
      }
    },
    api: function () {
      return client
    }
  }

}
</script>
