const Sequelize = require('sequelize')
const sequelize = require('../db')
const slugify = require('../helpers').slugify

const object = sequelize.define('object', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: Sequelize.STRING
})

object.hook('afterValidate', (object) => {
  object.slug = slugify(object.title)
})

object.hook('beforeBulkCreate', (objects) => {
  for (const object of objects) {
    object.slug = slugify(object.title)
  }
})

module.exports = object