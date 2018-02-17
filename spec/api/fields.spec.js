const app = require('../../src/app')
const request = require('supertest')
const object = require('../../src/models/object')
const page = require('../../src/models/page')
const fieldInput = require('../../src/models/fieldInput')
const field = require('../../src/models/field')

describe('/api/fields', () => {


  beforeAll((done) => {
    Promise.all([
      object.sync({ force: true }),
      page.sync({ force: true }),
      fieldInput.sync({ force: true })
    ]).then(() => {
      return Promise.all([
        fieldInput.create({
          title: 'Text',
          type: 'text'
        }),
        object.create({
          title: 'Property'
        }),
        page.create({
          title: 'Contact'
        })
      ])
    }).then(() => {
      done()
    }).catch((error) => done(error))

  })

  afterAll((done) => {
    Promise.all([
      object.sync({ force: true }),
      page.sync({ force: true }),
      fieldInput.sync({ force: true })
    ])
      .then(() => done())
      .catch((error) => done(error))
  })

  describe('POST', () => {

    it('should return 200', () => {
      return request(app).post('/api/fields').expect(200)
    })

    it('should create a field', () => {
      return request(app)
        .post('/api/fields')
        .send({ title: 'Description', objectId: 1, fieldInputId: 1 })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body.title).toBe('Description')
          expect(res.body.slug).toBe('description')
          expect(res.body.objectId).toBe(1)
        })
    })

  })

})