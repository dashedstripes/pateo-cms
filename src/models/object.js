const Sequelize = require('sequelize')
const sequelize = require('../db')
const slugify = require('../helpers').slugify

const allowedAttribues = ['id', 'title', 'slug']

const object = sequelize.define('object', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      is: /^[\w\-\s]+$/
    }
  },
  slug: Sequelize.STRING
})

// For some reason beforeCreate, and beforeUpdate doesn't function
// like you'd expect them to..
// I'm using afterValidate instead as it seems to generate the slug properly.

object.hook('afterValidate', (object) => {
  object.slug = slugify(object.title)
})

object.hook('beforeBulkCreate', (objects) => {
  for (const object of objects) {
    object.slug = slugify(object.title)
  }
})

module.exports = object