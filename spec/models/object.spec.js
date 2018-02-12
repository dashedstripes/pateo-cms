const object = require('../../src/models/object')

describe('object', () => {

  beforeAll((done) => {
    object.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should load', () => {
    expect(object).toBeDefined()
  })

  it('should have a title', () => {
    return object.create({
      title: 'Property'
    }).then((result) => {
      expect(result.title).toBe('Property')
    })
  })

  it('should not save without a title', () => {
    return object.create({
      title: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

  it('should generate a slug from title', () => {
    return object.create({
      title: 'Property Image'
    }).then((result) => expect(result.slug).toBe('property-image'))
  })

})