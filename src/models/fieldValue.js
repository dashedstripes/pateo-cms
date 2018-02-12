const Sequelize = require('sequelize')
const sequelize = require('../db')

const fieldValue = sequelize.define('fieldValue', {
  value: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = fieldValue