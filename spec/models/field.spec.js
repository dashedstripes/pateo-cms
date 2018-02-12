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

})