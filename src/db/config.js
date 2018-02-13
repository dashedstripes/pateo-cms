module.exports = {
  dev: {
    database: 'cms_tdd_dev',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    database: 'cms_tdd_test',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    database: 'cms_tdd',
    username: process.env.DB_USERNAME,
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}