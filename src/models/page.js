const Sequelize = require('sequelize')
const sequelize = require('../db')
const slugify = require('../helpers').slugify

const page = sequelize.define('page', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: Sequelize.STRING
})

page.hook('afterValidate', (page) => {
  page.slug = slugify(page.title)
})

module.exports = page