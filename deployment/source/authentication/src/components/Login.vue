<style scoped lang="scss">
  .cape-authentication-login {
    width: 416px;

    .separator {
      position: relative;
      text-align: center;
      padding: 1.5rem 0;

      .label {
        display: inline-block;
        padding: 0 0.5rem;
        background-color: #ffffff;
        white-space: nowrap;
        color: #B0BEC5;
        font-size: 0.75rem;
      }

      .line {
        display: inline-block;
        width: 100%;
        height: 0.0625rem;
        background-color: #E0E0E0;
      }
    }

    .btn-facebook i,
    .btn-google i, {
      margin: 0 0.5rem 0 0;
    }

    .btn-facebook,
    .btn-google {
      background-color: #ECEFF1;
      color: #90A4AE;

      &:hover {
        background-color: #CFD8DC;
        color: #78909C;
      }
    }

    // .btn-facebook {
    //   background-color: #3F51B5;
    //   color: #ffffff;
    //
    //   &:hover {
    //     background-color: #303F9F;
    //   }
    // }
    //
    // .btn-google {
    //   background-color: #2196F3;
    //   color: #ffffff;
    //
    //   &:hover {
    //     background-color: #1976D2;
    //   }
    // }
  }
</style>

<template>
  <div class="cape-authentication-login">

    <!-- Panel -->

    <div class="panel">
      <div class="panel-inner">

        <!-- Header -->

        <div class="panel-header">
          <h4 class="primary">Welcome!</h4>
          <h4 class="secondary">Sign in to use your account.</h4>
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
            Redirecting to dashboard
          </div>
        </template>

        <!-- End alerts -->

        <!-- Body -->

        <div class="panel-body">
          <div class="form-group">
            <input
              v-model="login"
              type="text"
              class="form-control"
              placeholder="Username">
          </div>
          <div class="form-group">
            <input
              v-model="password"
              v-on:keyup.enter="submit"
              type="password"
              class="form-control"
              placeholder="Password">
          </div>
          <!--
          <div class="form-group text-right">
            <a
              href="#/recover"
              class="link link-primary">Forgot your password?</a>
          </div>
          -->
          <button
            v-on:click="submit"
            v-bind:disabled="progress"
            type="submit"
            class="btn btn-block btn-primary">
            <template v-if="!progress">
              Login
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
        Don't have an account?
        <a href="#/register" class="link link-primary">Sign up</a>
      </p>
    </div>

    <!-- End footer -->

  </div>
</template>

<script>
import _ from 'lodash'
import client from '@/client.js'
import configuration from '@/configuration.js'

const OAUTH_ERROR = 'We were unable to log you in.'

export default {

  data: function () {
    return {
      OAUTH_ERROR: OAUTH_ERROR,
      login: '',
      password: '',
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
      client.authentication.login({
        username: this.login,
        password: this.password
      }, _.bind(function (error, data) {
        this.progress = false
        if (error) {
          this.error = error.message
          return
        }
        this.redirect = true
        if (configuration.authentication.login.redirectURL) {
          window.location.href = configuration.authentication.login.redirectURL
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
