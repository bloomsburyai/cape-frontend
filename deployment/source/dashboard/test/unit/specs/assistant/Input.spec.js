/* eslint-disable no-unused-expressions */

import $ from 'jquery'
import Vue from 'vue'
import Input from '@/components/assistant/Input'

describe('Assistant', function () {
  /**
   * Input
   */
  describe('Input.vue', function () {
    it('has data expected structure', () => {
      const data = Input.data()
      expect(data).to.have.a.property('inputValue')
    })
    it('has props expected structure', () => {
      const properties = {
        placeholder: 'placeholder',
        value: 'value'
      }
      const Constructor = Vue.extend(Input)
      const component = new Constructor({
        propsData: properties
      })
      expect(component.$props).to.include(properties)
    })
    it('updates input value of value change', (done) => {
      const Constructor = Vue.extend(Input)
      const component = new Constructor()
      expect(component.value).to.be.undefined
      component.value = 'value'
      component.$nextTick(() => {
        expect(component.inputValue).to.equal(component.value)
        done()
      })
    })
    it('calls handlers', () => {
      const enterCallback = sinon.spy()
      const buttonCallback = sinon.spy()
      const component = new Vue(Input).$mount()
      component._handleInputEnterKey = enterCallback
      component._handleButtonClick = buttonCallback
      const $input = $('input[type="text"]', component.$el)
      const $button = $('.cape-dashboard-icon-button', component.$el)
      const keyboardEvent = document.createEvent('Event')
      keyboardEvent.initEvent('keyup')
      keyboardEvent.which = 13
      keyboardEvent.keyCode = 13
      $input[0].dispatchEvent(keyboardEvent)
      $button.trigger('click')
      sinon.assert.called(enterCallback)
      sinon.assert.called(buttonCallback)
    })
    it('emits input event', () => {
      const callback = sinon.spy()
      const component = new Vue(Input)
      component.$on('input', callback)
      component._handleInputEnterKey()
      component._handleButtonClick()
      expect(callback.callCount).to.equal(2)
    })
  })
})
