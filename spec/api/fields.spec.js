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

  describe('GET', () => {

    it('should return 200', () => {
      return request(app).get('/api/fields').expect(200)
    })

    it('should respond with json', () => {
      return request(app)
        .get('/api/fields')
        .expect('Content-Type', /json/)
    })

    it('should return an array of fields', () => {
      return field.bulkCreate([
        {
          title: 'Description',
          objectId: 1,
          pageId: null,
          fieldInputId: 1
        },
        {
          title: 'Medium Type',
          objectId: null,
          pageId: 1,
          fieldInputId: 1
        }
      ]).then(() => {
        return request(app)
          .get('/api/fields')
          .then((res) => {
            expect(res.body).toEqual([
              {
                id: 1,
                title: 'Description',
                slug: 'description',
                objectId: 1,
                pageId: null,
                fieldInputId: 1
              },
              {
                id: 2,
                title: 'Medium Type',
                slug: 'medium-type',
                objectId: null,
                pageId: 1,
                fieldInputId: 1
              }
            ])
          })
      })
    })
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

describe('/api/fields/:field_id', () => {

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

  beforeEach((done) => {
    return field.sync({ force: true })
      .then(() => {
        return field.bulkCreate([
          {
            title: 'Description',
            objectId: 1,
            pageId: null,
            fieldInputId: 1
          },
          {
            title: 'Medium Type',
            objectId: null,
            pageId: 1,
            fieldInputId: 1
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
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

  describe('GET', () => {
    it('should return 200', () => {
      return request(app).get('/api/fields/1').expect(200)
    })

    it('should return an field from field_id', () => {
      return request(app)
        .get('/api/fields/1')
        .then((res) => {
          expect(res.body).toEqual(
            {
              id: 1,
              title: 'Description',
              slug: 'description',
              objectId: 1,
              pageId: null,
              fieldInputId: 1
            })
        })
    })
  })

  describe('PUT', () => {
    it('should return 200', () => {
      return request(app).put('/api/fields/1').expect(200)
    })

    it('should update an existing field by id', () => {
      return request(app)
        .put('/api/fields/1')
        .send({ title: 'Number of Rooms' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((res) => {
          expect(res.body).toEqual([1])
        })
    })
  })

  describe('DELETE', () => {
    it('should return 200', () => {
      return request(app).delete('/api/fields/1').expect(200)
    })

    it('should delete an existing field by id', () => {
      return request(app)
        .delete('/api/fields/1')
        .then((res) => {
          expect(res.body).toEqual(1)
        })
    })
  })
})