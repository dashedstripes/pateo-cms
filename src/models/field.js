const Sequelize = require('sequelize')
const sequelize = require('../db')
const object = require('./object')
const page = require('./page')
const fieldInput = require('./fieldInput')
const slugify = require('../helpers').slugify

const field = sequelize.define('field', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: Sequelize.STRING
})

field.hook('afterValidate', (field) => {
  field.slug = slugify(field.title)
})

field.hook('beforeBulkCreate', (fields) => {
  for (const field of fields) {
    field.slug = slugify(field.title)
  }
})

field.belongsTo(object)
field.belongsTo(page)
field.belongsTo(fieldInput)

module.exports = field