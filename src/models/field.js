const Sequelize = require('sequelize')
const sequelize = require('../db')

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

module.exports = field