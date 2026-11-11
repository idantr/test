import cds from '@sap/cds'
import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'

cds.test(import.meta.dirname + '/..')

let srv

describe('GreetingService', () => {
  before(async () => {
    srv = await cds.connect.to('greeting.GreetingService')
  })

  it('should return default greeting when no name is provided', async () => {
    const result = await srv.send('greet', {})
    assert.strictEqual(result, 'Hello, World!')
  })

  it('should return personalised greeting when a name is provided', async () => {
    const result = await srv.send('greet', { name: 'SAP' })
    assert.strictEqual(result, 'Hello, SAP!')
  })

  it('should trim whitespace from the name', async () => {
    const result = await srv.send('greet', { name: '  BTP  ' })
    assert.strictEqual(result, 'Hello, BTP!')
  })

  it('should return default greeting when name is blank whitespace', async () => {
    const result = await srv.send('greet', { name: '   ' })
    assert.strictEqual(result, 'Hello, World!')
  })
})
