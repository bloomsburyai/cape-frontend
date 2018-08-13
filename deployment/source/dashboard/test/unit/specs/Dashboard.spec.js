/* eslint-disable no-unused-expressions */

import moxios from 'moxios'
import Vue from 'vue'

import router from '@/router'
import * as configuration from './configuration'
import client from '@/client'
import Dashboard from '@/Dashboard'

function moxiosStubProfileRequest () {
  moxios.stubRequest(/get-profile/, {
    status: 200,
    response: {
      success: true,
      result: {
        username: 'test@bloomsbury.ai',
        plan: 'free',
        termsAgreed: false,
        onboardingCompleted: false,
        forwardEmail: 'test@bloomsbury.ai',
        forwardEmailVerified: false
      }
    }
  })
}

describe('Dashboard', function () {
  it('has expected data structure', () => {
    const data = Dashboard.data()
    expect(data).to.have.a.property('drawerOpened', true)
    expect(data).to.have.a.property('coversOpened', false)
    expect(data).to.have.a.property('termsAlertOpened', false)
    expect(data).to.have.a.property('termsModalOpened', false)
    expect(data).to.have.a.property('onboardingOpened', false)
  })
  it('updates state according to API values', (done) => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.$mount()
    moxios.wait(() => {
      expect(component).to.have.a.property('termsAlertOpened', true)
      expect(component).to.have.a.property('onboardingOpened', true)
      moxios.uninstall(client._axios)
      done()
    })
  })
  it('handles terms alert open event', () => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.termsAlertOpened = true
    component.$mount()
    component.$refs.termsAlert.$emit('open')
    expect(component).to.have.a.property('coversOpened', true)
    expect(component).to.have.a.property('termsModalOpened', true)
    moxios.uninstall(client._axios)
  })
  it('handles terms alert close event', () => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.termsAlertOpened = true
    component.$mount()
    component.$refs.termsAlert.$emit('close')
    expect(component).to.have.a.property('coversOpened', false)
    expect(component).to.have.a.property('termsModalOpened', false)
    moxios.uninstall(client._axios)
  })
  it('handles terms modal close event', () => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.coversOpened = true
    component.termsModalOpened = true
    component.$mount()
    component.$refs.termsModal.$emit('close')
    expect(component).to.have.a.property('coversOpened', false)
    expect(component).to.have.a.property('termsModalOpened', false)
    moxios.uninstall(client._axios)
  })
  it('handles terms modal agree event', () => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.coversOpened = true
    component.termsModalOpened = true
    component.$mount()
    component.$refs.termsModal.$emit('agree')
    expect(component).to.have.a.property('coversOpened', false)
    expect(component).to.have.a.property('termsModalOpened', false)
    expect(component).to.have.a.property('termsAlertOpened', false)
    moxios.uninstall(client._axios)
  })
  it('handles onboardin close event', () => {
    client.configuration = configuration.EMPTY
    moxios.install(client._axios)
    moxiosStubProfileRequest()
    const Constructor = Vue.extend(Dashboard)
    const component = new Constructor({router})
    component.onboardingOpened = true
    component.$mount()
    component.$refs.onboarding.$emit('close')
    expect(component).to.have.a.property('onboardingOpened', false)
    moxios.uninstall(client._axios)
  })
})
