const app = require('../../src/app')
const request = require('supertest')

const object = require('../../src/models/object')
const page = require('../../src/models/page')
const fieldInput = require('../../src/models/fieldInput')
const content = require('../../src/models/content')
const field = require('../../src/models/field')
const fieldValue = require('../../src/models/fieldValue')

describe('/api/field_values', () => {

  /**
   * The crazy amount of .then() is because mocha didn't like me using
   * Promise.all() - for some reason tables weren't being created in the right
   * order, despite me creating models without relations first.
   * 
   * Anyway, you get used to the .then() after a while...
   */

  beforeAll((done) => {
    object.sync({ force: true })
      .then(() => page.sync({ force: true }))
      .then(() => fieldInput.sync({ force: true }))
      .then(() => content.sync({ force: true }))
      .then(() => field.sync({ force: true }))
      .then(() => fieldValue.sync({ force: true }))
      .then(() => object.create({ title: 'Property' }))
      .then(() => page.create({ title: 'Contact' }))
      .then(() => fieldInput.create({ title: 'Text', type: 'text' }))
      .then(() => content.create({ title: '123 Fake Street', objectId: 1 }))
      .then(() => field.create({ title: 'Description', fieldInputId: 1, pageId: null, objectId: 1 }))
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll((done) => {
    object.sync({ force: true })
      .then(() => page.sync({ force: true }))
      .then(() => fieldInput.sync({ force: true }))
      .then(() => content.sync({ force: true }))
      .then(() => field.sync({ force: true }))
      .then(() => fieldValue.sync({ force: true }))
      .then((done) => done())
      .catch((error) => done(error))
  })

  describe('POST', () => {

    it('should return 200', () => {
      return request(app).post('/api/field_values').expect(200)
    })

    it('should create a field value', () => {
      return request(app)
        .post('/api/field_values')
        .send({ value: 'A lovely home', fieldId: 1, contentId: 1 })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body.value).toBe('A lovely home')
          expect(res.body.fieldId).toBe(1)
          expect(res.body.contentId).toBe(1)
        })
    })

  })

})

describe('/api/field_values/:field_value_id', () => {

  beforeAll((done) => {
    object.sync({ force: true })
      .then(() => page.sync({ force: true }))
      .then(() => fieldInput.sync({ force: true }))
      .then(() => content.sync({ force: true }))
      .then(() => field.sync({ force: true }))
      .then(() => fieldValue.sync({ force: true }))
      .then(() => object.create({ title: 'Property' }))
      .then(() => page.create({ title: 'Contact' }))
      .then(() => fieldInput.create({ title: 'Text', type: 'text' }))
      .then(() => content.create({ title: '123 Fake Street', objectId: 1 }))
      .then(() => field.create({ title: 'Description', fieldInputId: 1, pageId: null, objectId: 1 }))
      .then(() => done())
      .catch((error) => done(error))
  })

  beforeEach((done) => {
    return fieldValue.sync({ force: true })
      .then(() => {
        return fieldValue.bulkCreate([
          {
            value: 'A Lovely home',
            fieldId: 1,
            contentId: 1
          },
          {
            value: 'A terrible place',
            fieldId: 1,
            contentId: 1
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll((done) => {
    object.sync({ force: true })
      .then(() => page.sync({ force: true }))
      .then(() => fieldInput.sync({ force: true }))
      .then(() => content.sync({ force: true }))
      .then(() => field.sync({ force: true }))
      .then(() => fieldValue.sync({ force: true }))
      .then((done) => done())
      .catch((error) => done(error))
  })

  describe('GET', () => {
    it('should return 200', () => {
      return request(app).get('/api/field_values/1').expect(200)
    })

    it('should return an field from field_value_id', () => {
      return request(app)
        .get('/api/field_values/1')
        .then((res) => {
          expect(res.body).toEqual(
            {
              id: 1,
              value: 'A Lovely home',
              fieldId: 1,
              contentId: 1
            })
        })
    })
  })

  describe('PUT', () => {
    it('should return 200', () => {
      return request(app).put('/api/field_values/1').expect(200)
    })

    it('should update an existing field by id', () => {
      return request(app)
        .put('/api/field_values/1')
        .send({ value: 'A great place' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body).toEqual([1])
        })
    })
  })

  describe('DELETE', () => {
    it('should return 200', () => {
      return request(app).delete('/api/field_values/1').expect(200)
    })

    it('should delete an existing field by id', () => {
      return request(app)
        .delete('/api/field_values/1')
        .then((res) => {
          expect(res.body).toEqual(1)
        })
    })
  })
})