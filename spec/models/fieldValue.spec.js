const fieldValue = require('../../src/models/fieldValue')

describe('fieldValue', () => {

  beforeEach((done) => {
    fieldValue.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  afterAll(() => {
    fieldValue.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should load', () => {
    expect(fieldValue).toBeDefined()
  })

  it('should have a value', () => {
    return fieldValue.create({
      value: 'A lovely place'
    }).then((result) => {
      expect(result.value).toBe('A lovely place')
    })
  })

  it('should not save without a value', () => {
    return fieldValue.create({
      value: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

})