const Sequelize = require('sequelize')
const sequelize = require('../db')
const field = require('./field')
const content = require('./content')

const fieldValue = sequelize.define('fieldValue', {
  value: {
    type: Sequelize.STRING
  }
})

fieldValue.belongsTo(field)
fieldValue.belongsTo(content)

module.exports = fieldValue