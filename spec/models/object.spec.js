const object = require('../../src/models/object')

describe('object', () => {

  beforeAll((done) => {
    object.sync({ force: true })
      .then(() => done())
  })

  it('should load', () => {
    expect(object).toBeDefined()
  })

  it('should have a title', (done) => {
    object.create({
      title: 'Property'
    }).then((result) => {
      expect(result.title).toBe('Property')
      done()
    })
  })

  it('should generate a slug from title', () => {
    return object.create({
      title: 'Property Image'
    }).then((result) => expect(result.slug).toBe('property-image'))
  })

})