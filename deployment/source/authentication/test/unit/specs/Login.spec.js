import Vue from 'vue'
// import axios from 'axios'
import moxios from 'moxios'
import './configuration.js'
import client from '@/client.js'
import Login from '@/components/Login'

describe('Login.vue', () => {
  it('doesnt contain any alerts by default', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.alert')).to.be.null
  })
  it('doesnt contain any progress indicator by default', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.fa-circle-o-notch')).to.be.null
  })
  it('has correct data structure', function () {
    expect(Login.data).to.be.a('function')
    const data = Login.data()
    expect(data).to.have.a.property('login', '')
    expect(data).to.have.a.property('password', '')
    expect(data).to.have.a.property('progress', false)
    expect(data).to.have.a.property('error', '')
    expect(data).to.have.a.property('redirect', false)
  })
  it('exposes submit function', function () {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor()
    expect(vm).to.have.a.property('submit').that.is.a('function')
  })
  it('sets correct values on submit', function () {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor()
    vm.submit()
    expect(vm).to.have.a.property('progress', true)
    expect(vm).to.have.a.property('error', '')
    expect(vm).to.have.a.property('redirect', false)
  })
  it('sets correct values on submit success callback', function (done) {
    moxios.install(client._axios)
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    vm.submit()
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true,
          result: {
            sessionId: '12345',
            message: 'welcome'
          }
        }
      })
      .then(function () {
        moxios.uninstall(client._axios)
        expect(vm).to.have.a.property('progress', false)
        expect(vm).to.have.a.property('error', '')
        expect(vm).to.have.a.property('redirect', true)
        done()
      })
      .catch(function (error) {
        if (error) {}
        moxios.uninstall(client._axios)
        done()
      })
    })
  })
  it('sets correct values on submit error callback', function (done) {
    let errorMessage = 'some error because missing sessionID'
    moxios.install(client._axios)
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    vm.submit()
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true,
          result: {
            message: errorMessage
          }
        }
      })
      .then(function () {
        moxios.uninstall(client._axios)
        expect(vm).to.have.a.property('progress', false)
        expect(vm).to.have.a.property('error', errorMessage)
        expect(vm).to.have.a.property('redirect', false)
        done()
      })
      .catch(function (error) {
        if (error) {}
        moxios.uninstall(client._axios)
        done()
      })
    })
  })
})
