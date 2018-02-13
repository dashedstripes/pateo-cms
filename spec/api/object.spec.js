const app = require('../../src/app')
const request = require('supertest')
const object = require('../../src/models/object')

describe('GET /api/objects', () => {

  beforeEach((done) => {
    return object.sync({ force: true })
      .then(() => {
        return object.bulkCreate([
          {
            title: 'Property'
          },
          {
            title: 'Artwork'
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).get('/api/objects').expect(200)
  })

  it('should respond with json', () => {
    return request(app)
      .get('/api/objects')
      .expect('Content-Type', /json/)
  })

  it('should return an array of objects', () => {
    return request(app)
      .get('/api/objects')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            title: 'Property',
            slug: 'property'
          },
          {
            id: 2,
            title: 'Artwork',
            slug: 'artwork'
          }
        ])
      })
  })

})