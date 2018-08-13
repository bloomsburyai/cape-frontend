/* eslint-env mocha */

import { expect } from 'chai'

import globalConfiguration from '../../configuration'
import * as constants from '../src/constants'
import Client from '../src/cape'

import Authentication from '../src/resources/Authentication'
import Document from '../src/resources/Document'
import Inbox from '../src/resources/Inbox'
import Query from '../src/resources/Query'
import Reply from '../src/resources/Reply'
import User from '../src/resources/User'
import Annotation from '../src/resources/Annotation'

describe('Client', function () {
  it('has default configuration', function () {
    const client = new Client()
    expect(client.configuration).to.have.all.keys('backendURL', 'timeout')
  })
  it('correctly handles partial configurations', function () {
    const client1 = new Client({timeout: 2000})
    expect(client1.configuration).to.include({
      backendURL: globalConfiguration.backend.url,
      timeout: 2000
    })
    const client2 = new Client({
      backendURL: 'https://google.com',
      timeout: 5000
    })
    expect(client2.configuration).to.include({
      backendURL: 'https://google.com',
      timeout: 5000
    })
    const client3 = new Client()
    client3.configuration = {
      backendURL: 'https://google.com'
    }
    expect(client3.configuration).to.include({
      backendURL: 'https://google.com',
      timeout: 60000
    })
  })
  it('exposes constants as properties', function () {
    let value = ''
    for (let key in constants) {
      value = constants[key]
      expect(Client).to.have.a.property(key, value)
    }
  })
  it('exposes resources as properties', function () {
    const client = new Client()
    expect(client).to.have.a.property('authentication').that.is.an.instanceof(Authentication)
    expect(client).to.have.a.property('document').that.is.an.instanceof(Document)
    expect(client).to.have.a.property('inbox').that.is.an.instanceof(Inbox)
    expect(client).to.have.a.property('query').that.is.an.instanceof(Query)
    expect(client).to.have.a.property('reply').that.is.an.instanceof(Reply)
    expect(client).to.have.a.property('user').that.is.an.instanceof(User)
    expect(client).to.have.a.property('annotation').that.is.an.instanceof(Annotation)
  })
})
