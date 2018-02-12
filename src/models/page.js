const Sequelize = require('sequelize')
const sequelize = require('../db')

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
  page.slug = page.title.toLowerCase().replace(/ /g, '-')
})

module.exports = page