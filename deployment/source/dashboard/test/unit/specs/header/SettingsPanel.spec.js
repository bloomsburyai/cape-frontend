/* eslint-disable no-unused-expressions */

// import Vue from 'vue'
// import _ from 'lodash'
// import $ from 'jquery'
// import moxios from 'moxios'
// import * as configuration from '../configuration'
// import client from '@/client'
// import SettingsPanel from '@/components/header/SettingsPanel'
// import AlertMessage from '@/components/alert/Message'
//
// describe('SettingsPanel.vue', function () {
//   /**
//    * Alert manager
//    */
//   describe('Alert manager', function () {
//     beforeEach(function () {
//       this.errorResponse = {
//         status: 500,
//         response: {
//           success: false,
//           result: {message: 'Error'}
//         }
//       }
//       moxios.install(client._axios)
//     })
//     afterEach(function () {
//       moxios.uninstall(client._axios)
//     })
//     it('is closed when parent component is mounted', () => {
//       const component = new Vue(SettingsPanel).$mount()
//       expect(component.$refs.alertManager.opened).to.be.false
//     })
//     it('gets opened when threshold retrieval fails', (done) => {
//       moxios.stubRequest(/get-default-threshold/, this.errorResponse)
//       const component = new Vue(SettingsPanel).$mount()
//       moxios.wait(() => {
//         expect(component.$refs.alertManager.opened).to.be.true
//         done()
//       })
//     })
//     it('gets opened when threshold value is saved', (done) => {
//       const successResponse = {
//         status: 200,
//         response: {
//           success: true,
//           result: {threshold: 'medium'}
//         }
//       }
//       moxios.stubRequest(/set-default-threshold/, successResponse)
//       const component = new Vue(SettingsPanel).$mount()
//       $('.cape-dashboard-progress-label-button', component.$el).click()
//       moxios.wait(() => {
//         expect(component.$refs.alertManager.opened).to.be.true
//         done()
//       })
//     })
//     it('gets opened when query token retrieval fails', (done) => {
//       moxios.stubRequest(/get-user-token/, this.errorResponse)
//       const component = new Vue(SettingsPanel).$mount()
//       moxios.wait(() => {
//         expect(component.$refs.alertManager.opened).to.be.true
//         done()
//       })
//     })
//     it('gets opened when admin token retrieval fails', (done) => {
//       moxios.stubRequest(/get-admin-token/, this.errorResponse)
//       const component = new Vue(SettingsPanel).$mount()
//       moxios.wait(() => {
//         expect(component.$refs.alertManager.opened).to.be.true
//         done()
//       })
//     })
//     it('gets closed on threshold dropdown select', () => {
//       const component = new Vue(SettingsPanel).$mount()
//       component.$refs.alertManager.open({
//         type: AlertMessage.TYPE_ERROR,
//         label: 'test'
//       })
//       expect(component.$refs.alertManager.opened).to.be.true
//       $('.cape-dashboard-dropdown-label-option', component.$el).eq(2).click()
//       expect(component.$refs.alertManager.opened).to.be.false
//     })
//     it('gets closed on save click', () => {
//       const component = new Vue(SettingsPanel).$mount()
//       component.$refs.alertManager.open({
//         type: AlertMessage.TYPE_ERROR,
//         label: 'test'
//       })
//       expect(component.$refs.alertManager.opened).to.be.true
//       $('.cape-dashboard-progress-label-button', component.$el).click()
//       expect(component.$refs.alertManager.opened).to.be.false
//     })
//   })
//   /**
//    * Threshold
//    */
//   describe('Threshold dropdown', function () {
//     it('has data model, collection and expected structure', () => {
//       const knownThresholds = [
//         client.THRESHOLD_VERY_LOW,
//         client.THRESHOLD_LOW,
//         client.THRESHOLD_MEDIUM,
//         client.THRESHOLD_HIGH,
//         client.THRESHOLD_VERY_HIGH
//       ]
//       const data = SettingsPanel.data()
//       expect(data).to.have.a.property('thresholdDropdownCollection').that.is.an('array').with.lengthOf(knownThresholds.length)
//       expect(data).to.have.a.property('thresholdDropdownModel').that.is.an('object').with.keys('value', 'label')
//       let collectionModel = null
//       for (let i = 0; i < data.thresholdDropdownCollection.length; i++) {
//         collectionModel = data.thresholdDropdownCollection[i]
//         expect(collectionModel).to.be.not.null
//         expect(collectionModel).to.have.keys('value', 'label')
//         expect(knownThresholds).to.include(collectionModel.value)
//       }
//     })
//     it('initial model is set by client call', (done) => {
//       const thresholdValue = 'medium'
//       moxios.install(client._axios)
//       moxios.stubRequest(/get-default-threshold/, {
//         status: 200,
//         response: {success: true, result: {threshold: thresholdValue}}
//       })
//       const component = new Vue(SettingsPanel).$mount()
//       moxios.wait(() => {
//         expect(component.thresholdDropdownModel.value).to.equal(thresholdValue)
//         moxios.uninstall(client._axios)
//         done()
//       })
//     })
//     it('handles option selection', () => {
//       client.configuration = configuration.FULL
//       const thresholdValue = 'medium'
//       const callback = sinon.spy()
//       const component = new Vue(SettingsPanel).$mount()
//       component._handleThresholdDropdownOptionSelect = callback
//       $('.cape-dashboard-dropdown-label-option', component.$el).eq(2).click()
//       sinon.assert.called(callback)
//       sinon.assert.calledOnce(callback)
//       const thresholdModel = callback.getCall(0).args[1]
//       expect(thresholdModel).to.have.keys('value', 'label')
//       expect(thresholdModel.value).to.equal(thresholdValue)
//     })
//     it('updates trigger label on option selection', (done) => {
//       const thresholdValue = 'medium'
//       const component = new Vue(SettingsPanel).$mount()
//       $('.cape-dashboard-dropdown-label-option', component.$el).eq(2).click()
//       expect(component.thresholdDropdownModel.value).to.equal(thresholdValue)
//       component.$nextTick(() => {
//         let triggerLabel = $('.cape-dashboard-dropdown-label-trigger .label', component.$el).text()
//         triggerLabel = _.trim(triggerLabel)
//         expect(component.thresholdDropdownModel.label).to.equal(triggerLabel)
//         done()
//       })
//     })
//   })
//   /**
//    * Token
//    */
//   describe('Token', function () {
//     it('populate inputs by client calls', (done) => {
//       const queryTokenValue = 'user-token'
//       const adminTokenValue = 'admin-token'
//       moxios.install(client._axios)
//       moxios.stubRequest(/get-user-token/, {
//         status: 200,
//         response: {success: true, result: {userToken: queryTokenValue}}
//       })
//       moxios.stubRequest(/get-admin-token/, {
//         status: 200,
//         response: {success: true, result: {adminToken: adminTokenValue}}
//       })
//       const component = new Vue(SettingsPanel).$mount()
//       moxios.wait(() => {
//         expect(component.queryTokenValue).to.equal(queryTokenValue)
//         expect(component.adminTokenValue).to.equal(adminTokenValue)
//         const queryInputValue = $('.form-control', component.$el).eq(0).val()
//         const adminInputValue = $('.form-control', component.$el).eq(1).val()
//         expect(queryInputValue).to.equal(queryTokenValue)
//         expect(adminInputValue).to.equal(adminTokenValue)
//         moxios.uninstall(client._axios)
//         done()
//       })
//     })
//   })
// })
