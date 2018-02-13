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

  it('should have an alphanumeric (with space) title', () => {
    return object.create({
      title: '.!!Proper Teaaa&^%$'
    }).then((result) => { throw Error })
      .catch((error) => {
        expect(error.name).toBe('SequelizeValidationError')
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

  it('should generate a slug on update', () => {
    object.sync({ force: true })
      .then(() => {
        return object.create({
          title: 'Property Image'
        })
          .then((result) => {
            return object.update({
              title: 'Artwork'
            }, {
                where: {
                  id: 1
                }
              })
          })
          .then((result) => {
            expect(result).toEqual([1])
            return object.find({
              where: {
                id: 1
              }
            })
          }).then((result) => {
            expect(result.title).toBe('Artwork')
            expect(result.slug).toBe('artwork')
          })
      })
  })

})