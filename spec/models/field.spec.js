const field = require('../../src/models/field')

describe('field', () => {

  beforeAll((done) => {
    field.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should load', () => {
    expect(field).toBeDefined()
  })

  it('should have a title', () => {
    return field.create({
      title: 'Description'
    }).then((result) => {
      expect(result.title).toBe('Description')
    })
  })

  it('should not save without a title', () => {
    return field.create({
      title: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

  it('should generate a slug from title', () => {
    return field.create({
      title: 'Number of Rooms'
    }).then((result) => expect(result.slug).toBe('number-of-rooms'))
  })

})