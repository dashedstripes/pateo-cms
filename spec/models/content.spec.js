const content = require('../../src/models/content')

describe('content', () => {

  beforeEach((done) => {
    content.sync({ force: true })
      .then(() => done())
  })

  it('should load', () => {
    expect(content).toBeDefined()
  })

  it('should have a title', () => {
    return content.create({
      title: '123 Fake Street'
    }).then((result) => {
      expect(result.title).toBe('123 Fake Street')
    })
  })

  it('should not save without a title', () => {
    return content.create({
      title: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

  it('should generate a slug from title', () => {
    return content.create({
      title: '123 Fake Street'
    }).then((result) => expect(result.slug).toBe('123-fake-street'))
  })

})