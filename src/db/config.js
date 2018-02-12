module.exports = {
  dev: {
    database: 'cms_tdd_dev',
    username: 'adam',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    database: 'cms_tdd_test',
    username: 'adam',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    database: 'cms_tdd',
    username: 'adam',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}