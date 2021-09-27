const auth = require('./data/auth.json')
const fixture = require('./data/fixture.json')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const mailgun = require('../')({
  'apiKey': auth.api_key,
  'domain': auth.domain
})

describe('Send MIME', () => {
  beforeEach((done) => {
    setTimeout(done, 500)
  })

  it('test sendMime() with file path', (done) => {
    const filePath = path.join(__dirname, '/data/message.eml')

    const data = {
      'to': fixture.message.to,
      'message': filePath
    }

    mailgun.messages().sendMime(data, (err, body) => {
      assert.ifError(err)
      assert.ok(body.id)
      assert.ok(body.message)
      assert(/Queued. Thank you./.test(body.message))
      done()
    })
  })

  it('test sendMime() with file stream', (done) => {
    const filePath = path.join(__dirname, '/data/message.eml')

    const data = {
      'to': fixture.message.to,
      'message': fs.createReadStream(filePath)
    }

    mailgun.messages().sendMime(data, (err, body) => {
      assert.ifError(err)
      assert.ok(body.id)
      assert.ok(body.message)
      assert(/Queued. Thank you./.test(body.message))
      done()
    })
  })
})
