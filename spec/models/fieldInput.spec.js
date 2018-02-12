const fieldInput = require('../../src/models/fieldInput')

describe('fieldInput', () => {

  beforeAll((done) => {
    fieldInput.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should load', () => {
    expect(fieldInput).toBeDefined()
  })

  it('should have a title', () => {
    return fieldInput.create({
      title: 'Text',
      type: 'text'
    }).then((result) => {
      expect(result.title).toBe('Text')
    })
  })

  it('should not save without a title', () => {
    return fieldInput.create({
      title: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

  it('should have a type', () => {
    return fieldInput.create({
      title: 'Text',
      type: 'text'
    }).then((result) => {
      expect(result.type).toBe('text')
    })
  })

  it('should not save without a type', () => {
    return fieldInput.create({
      type: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

})