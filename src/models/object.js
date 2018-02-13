const Sequelize = require('sequelize')
const sequelize = require('../db')

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
  object.slug = object.title.toLowerCase().replace(/ /g, '-')
})

object.hook('beforeBulkCreate', (objects) => {
  for (const object of objects) {
    object.slug = object.title.toLowerCase().replace(/ /g, '-')
  }
})

module.exports = object