const app = require('../../src/app')
const request = require('supertest')
const fieldInput = require('../../src/models/fieldInput')

describe('/api/field_inputs', () => {

  beforeAll((done) => {
    return fieldInput.sync({ force: true })
      .then(() => {
        return fieldInput.bulkCreate([
          {
            title: 'Text',
            type: 'text'
          },
          {
            title: 'Number',
            type: 'number'
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll((done) => {
    return fieldInput.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  describe('GET', () => {

    it('should return 200', () => {
      return request(app).get('/api/field_inputs').expect(200)
    })

    it('should respond with json', () => {
      return request(app)
        .get('/api/field_inputs')
        .expect('Content-Type', /json/)
    })

    it('should return an array of fieldInputs', () => {
      return request(app)
        .get('/api/field_inputs')
        .then((res) => {
          expect(res.body).toEqual([
            {
              id: 1,
              title: 'Text',
              type: 'text'
            },
            {
              id: 2,
              title: 'Number',
              type: 'number'
            }
          ])
        })
    })
  })

})