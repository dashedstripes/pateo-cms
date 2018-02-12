const Sequelize = require('sequelize')
const sequelize = require('../db')
const object = require('./object')

const content = sequelize.define('content', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: Sequelize.STRING,
  objectId: Sequelize.INTEGER
})

content.hook('afterValidate', (content) => {
  content.slug = content.title.toLowerCase().replace(/ /g, '-')
})

content.belongsTo(object)

module.exports = content