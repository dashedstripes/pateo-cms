const config = require('./config')
const Sequelize = require('sequelize')

module.exports = (
  new Sequelize(
    config[process.env.NODE_ENV].database,
    config[process.env.NODE_ENV].username,
    config[process.env.NODE_ENV].password,

    {
      host: config[process.env.NODE_ENV].host,
      dialect: config[process.env.NODE_ENV].dialect,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
)