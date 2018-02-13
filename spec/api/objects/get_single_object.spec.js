const app = require('../../../src/app')
const request = require('supertest')
const object = require('../../../src/models/object')

describe('GET /api/objects/:object_id', () => {

  beforeEach((done) => {
    return object.sync({ force: true })
      .then(() => {
        return object.create({
          title: 'Property'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).get('/api/objects/1').expect(200)
  })

  it('should return an object from object_id', () => {
    return request(app)
      .get('/api/objects/1')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: 1,
            title: 'Property',
            slug: 'property'
          })
      })
  })

})