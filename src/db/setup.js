const sequelize = require('./')
const object = require('../../src/models/object')
const page = require('../../src/models/page')
const fieldInput = require('../../src/models/fieldInput')
const content = require('../../src/models/content')
const field = require('../../src/models/field')
const fieldValue = require('../../src/models/fieldValue')

object.sync({ force: true })
  .then(() => page.sync({ force: true }))
  .then(() => fieldInput.sync({ force: true }))
  .then(() => content.sync({ force: true }))
  .then(() => field.sync({ force: true }))
  .then(() => fieldValue.sync({ force: true }))
  .then(() => {
    return fieldInput.create({
      title: 'Text',
      type: 'text'
    })
  })
  .then(() => {
    console.log('Setup complete.')
    sequelize.close()
  })
  .catch((error) => console.log(error))

