const Sequelize = require('sequelize')
const sequelize = require('../db')
const object = require('./object')
const page = require('./page')
const fieldInput = require('./fieldInput')

const field = sequelize.define('field', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

field.hook('afterValidate', (field) => {
  field.slug = field.title.toLowerCase().replace(/ /g, '-')
})

field.belongsTo(object)
field.belongsTo(page)
field.belongsTo(fieldInput)

module.exports = field