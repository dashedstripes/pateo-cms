const Sequelize = require('sequelize')
const sequelize = require('../db')

const fieldInput = sequelize.define('fieldInput', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = fieldInput