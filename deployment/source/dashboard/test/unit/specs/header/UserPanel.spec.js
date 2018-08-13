/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import moxios from 'moxios'
import Vue from 'vue'

import * as configuration from '../configuration'
import client from '@/client'

import UserPanel from '@/components/header/UserPanel'

describe('UserPanel.vue', () => {
  it('has expected data structure', () => {
    expect(UserPanel.data).to.be.a('function')
    const data = UserPanel.data()
    // color
    expect(data).to.have.a.property('color')
    // profile
    expect(data).to.have.a.property('username')
    expect(data).to.have.a.property('userPlanValue')
    // plan
    expect(data).to.have.a.property('planCollection')
    expect(data).to.have.a.property('planModel')
    expect(data).to.have.a.property('planSaveProgress')
    // store
    expect(data).to.have.a.property('storeCollection')
    expect(data).to.have.a.property('storeModel')
  })
  it('sets profile default values on load error', (done) => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxios.stubRequest(/get-profile/, {
      status: 500
    })
    const component = new Vue(UserPanel).$mount()
    moxios.wait(() => {
      expect(component).to.have.a.property('username', UserPanel.DEFAULT_USERNAME)
      expect(component).to.have.a.nested.property('planModel.value', client.PLAN_FREE)
      expect(component).to.have.a.property('userPlanValue', client.PLAN_FREE)
      moxios.uninstall(client._axios)
      done()
    })
  })
  it('sets profile values on load', (done) => {
    const want = {
      username: 'test@bloomsbury.ai',
      plan: 'free',
      termsAgreed: false,
      onboardingCompleted: false,
      forwardEmail: 'test@bloomsbury.ai',
      forwardEmailVerified: false
    }
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxios.stubRequest(/get-profile/, {
      status: 200,
      response: {
        success: true,
        result: want
      }
    })
    const component = new Vue(UserPanel).$mount()
    moxios.wait(() => {
      expect(component).to.have.a.property('username', want.username)
      expect(component).to.have.a.nested.property('planModel.value', want.plan)
      expect(component).to.have.a.property('userPlanValue', want.plan)
      moxios.uninstall(client._axios)
      done()
    })
  })
  it('updates plan details on plan select', (done) => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxios.stubRequest(/get-profile/, {
      status: 200,
      response: {
        success: true,
        result: {
          username: 'test@bloomsbury.ai',
          plan: client.PLAN_FREE,
          termsAgreed: false,
          onboardingCompleted: false
        }
      }
    })
    const component = new Vue(UserPanel).$mount()
    const $plan = $('.plan .cape-dashboard-dropdown-label-option:eq(1)', component.$el)
    $plan.click()
    component.$nextTick(() => {
      expect(component).to.have.a.nested.property('planModel.value', client.PLAN_BASIC)
      expect(component).to.have.a.property('storeModel', component.storeCollection[client.PLAN_BASIC])
      moxios.uninstall(client._axios)
      done()
    })
  })
  it('updates plan save button considering saved plan', (done) => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxios.stubRequest(/get-profile/, {
      status: 200,
      response: {
        success: true,
        result: {
          username: 'test@bloomsbury.ai',
          plan: client.PLAN_BASIC,
          termsAgreed: false,
          onboardingCompleted: false
        }
      }
    })
    const component = new Vue(UserPanel).$mount()
    moxios.wait(() => {
      expect(component).to.have.a.property('planSaveLabel', 'Subscribed')
      expect(component).to.have.a.property('planSaveDisabled', true)
      const $plan = $('.plan .cape-dashboard-dropdown-label-option:eq(2)', component.$el)
      $plan.click()
      component.$nextTick(() => {
        expect(component).to.have.a.property('planSaveLabel', 'Subscribe')
        expect(component).to.have.a.property('planSaveDisabled', false)
        moxios.uninstall(client._axios)
        done()
      })
    })
  })
  it('logs the user out', (done) => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxios.stubRequest(/inbox/, {status: 200})
    const component = new Vue(UserPanel).$mount()
    const $logout = $('.footer .cape-dashboard-label-button', component.$el)
    $logout.click()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      expect(request.config.url).to.include('logout')
      moxios.uninstall(client._axios)
      done()
    })
  })
})
