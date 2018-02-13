const app = require('../../src/app')
const request = require('supertest')
const content = require('../../src/models/content')
const object = require('../../src/models/object')

describe('/api/contents', () => {

  beforeAll((done) => {
    return object.sync({ force: true })
      .then(() => {
        return object.create({
          title: 'Property'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  beforeEach((done) => {
    return content.sync({ force: true })
      .then(() => {
        return content.bulkCreate([
          {
            title: '123 Fake Street',
            objectId: 1
          },
          {
            title: '987 Fake Avenue',
            objectId: 1
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll((done) => {
    return object.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  describe('GET', () => {

    it('should return 200', () => {
      return request(app).get('/api/contents').expect(200)
    })

    it('should respond with json', () => {
      return request(app)
        .get('/api/contents')
        .expect('Content-Type', /json/)
    })

    it('should return an array of contents', () => {
      return request(app)
        .get('/api/contents')
        .then((res) => {
          expect(res.body).toEqual([
            {
              id: 1,
              title: '123 Fake Street',
              slug: '123-fake-street',
              objectId: 1
            },
            {
              id: 2,
              title: '987 Fake Avenue',
              slug: '987-fake-avenue',
              objectId: 1
            }
          ])
        })
    })
  })

  describe('POST', () => {

    it('should return 200', () => {
      return request(app).post('/api/contents').expect(200)
    })

    it('should create an content', () => {
      return request(app)
        .post('/api/contents')
        .send({ title: '123 Fake Street', objectId: 1 })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body.title).toBe('123 Fake Street')
          expect(res.body.slug).toBe('123-fake-street')
          expect(res.body.objectId).toBe(1)
        })
    })
  })

})

describe('/api/contents/:content_id', () => {

  beforeAll((done) => {
    return object.sync({ force: true })
      .then(() => {
        return object.create({
          title: 'Property'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  beforeEach((done) => {
    return content.sync({ force: true })
      .then(() => {
        return content.create(
          {
            title: '123 Fake Street',
            objectId: 1
          })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll((done) => {
    return object.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  describe('GET', () => {
    it('should return 200', () => {
      return request(app).get('/api/contents/1').expect(200)
    })

    it('should return an content from content_id', () => {
      return request(app)
        .get('/api/contents/1')
        .then((res) => {
          expect(res.body).toEqual(
            {
              id: 1,
              title: '123 Fake Street',
              slug: '123-fake-street',
              objectId: 1
            })
        })
    })
  })

  describe('PUT', () => {
    it('should return 200', () => {
      return request(app).put('/api/contents/1').expect(200)
    })

    it('should update an existing content by id', () => {
      return request(app)
        .put('/api/contents/1')
        .send({ title: '987 Fake Avenue' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body).toEqual([1])
        })
    })
  })

  describe('DELETE', () => {
    it('should return 200', () => {
      return request(app).delete('/api/contents/1').expect(200)
    })

    it('should delete an existing content by id', () => {
      return request(app)
        .delete('/api/contents/1')
        .then((res) => {
          expect(res.body).toEqual(1)
        })
    })
  })
})