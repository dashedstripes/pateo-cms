const Sequelize = require('sequelize')
const sequelize = require('../db')

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
  content.slug = content.title.toLowerCase().replace(/ /g, '-')
})

module.exports = content