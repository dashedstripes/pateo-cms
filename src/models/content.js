const Sequelize = require('sequelize')
const sequelize = require('../db')
const object = require('./object')
const slugify = require('../helpers').slugify

const content = sequelize.define('content', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: Sequelize.STRING
})

content.hook('afterValidate', (content) => {
  content.slug = slugify(content.title)
})

content.hook('beforeBulkCreate', (contents) => {
  for (const content of contents) {
    content.slug = slugify(content.title)
  }
})

content.belongsTo(object)

module.exports = content