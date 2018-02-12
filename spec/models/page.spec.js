const page = require('../../src/models/page')

describe('page', () => {

  beforeAll((done) => {
    page.sync({ force: true })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should load', () => {
    expect(page).toBeDefined()
  })

  it('should have a title', () => {
    return page.create({
      title: 'Contact'
    }).then((result) => {
      expect(result.title).toBe('Contact')
    })
  })

  it('should not save without a title', () => {
    return page.create({
      title: ''
    }).then((result) => { throw Error })
      .catch((error) => expect(error.name).toBe('SequelizeValidationError'))
  })

  it('should generate a slug from title', () => {
    return page.create({
      title: 'Start a project'
    }).then((result) => expect(result.slug).toBe('start-a-project'))
  })

})