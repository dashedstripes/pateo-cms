const app = require('../../src/app')
const request = require('supertest')
const object = require('../../src/models/object')

describe('GET /api/objects', () => {

  it('should return 200', () => {
    return request(app).get('/api/objects').expect(200)
  })

  it('should respond with json', () => {
    return request(app)
      .get('/api/objects')
      .expect('Content-Type', /json/)
  })

})