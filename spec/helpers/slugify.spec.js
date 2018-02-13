const slugify = require('../../src/helpers').slugify

describe('Slugify', () => {

  it('should load', () => {
    expect(slugify).toBeDefined
  })

  it('should convert a string into a slug', () => {
    let expected = 'a-whole-new-world'
    expect(slugify('A whole new World')).toEqual(expected)
  })

})