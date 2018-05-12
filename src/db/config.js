module.exports = {
  dev: {
    database: 'pateo_cms_dev',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    database: 'pateo_cms_test',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    database: 'pateo_cms',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}