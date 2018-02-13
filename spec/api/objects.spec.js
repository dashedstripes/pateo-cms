const app = require('../../src/app')
const request = require('supertest')
const object = require('../../src/models/object')

describe('/api/objects', () => {

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

  describe('GET', () => {

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

  describe('POST', () => {

    it('should return 200', () => {
      return request(app).post('/api/objects').expect(200)
    })

    it('should create an object', () => {
      return request(app)
        .post('/api/objects')
        .send({ title: 'Property' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body.title).toBe('Property')
          expect(res.body.slug).toBe('property')
        })
    })
  })

})

describe('/api/objects/:object_id', () => {

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

  describe('GET', () => {
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

  describe('PUT', () => {
    it('should return 200', () => {
      return request(app).put('/api/objects/1').expect(200)
    })

    it('should update an existing object by id', () => {
      return request(app)
        .put('/api/objects/1')
        .send({ title: 'Artwork' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body).toEqual([1])
        })
    })
  })

  describe('DELETE', () => {
    it('should return 200', () => {
      return request(app).delete('/api/objects/1').expect(200)
    })

    it('should delete an existing object by id', () => {
      return request(app)
        .delete('/api/objects/1')
        .then((res) => {
          expect(res.body).toEqual(1)
        })
    })
  })
})