module.exports = {
  dev: {
    database: 'cms_tdd_dev',
    username: 'agray',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    database: 'cms_tdd_test',
    username: 'agray',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    database: 'cms_tdd',
    username: 'agray',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  }
}