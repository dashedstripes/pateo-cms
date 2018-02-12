const Sequelize = require('sequelize')
const sequelize = require('../db')

const field = sequelize.define('field', {})

module.exports = field