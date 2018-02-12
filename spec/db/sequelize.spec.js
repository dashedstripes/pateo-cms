const config = require('../../src/db/config')
let sequelize;

describe('sequelize - test', () => {

  beforeEach(() => {
    jest.resetModules()
    process.env.NODE_ENV = 'test'
    sequelize = require('../../src/db')
    delete process.env.NODE_ENV
  })

  it('should connect to a test database when NODE_ENV=test', () => {
    let database = sequelize.config.database
    expect(database.substr(database.length - 5)).toBe('_test')
  })

  it('should use the database as defined in config', () => {
    expect(sequelize.config.database).toBe(config.test.database)
  })

  it('should use the username as defined in config', () => {
    expect(sequelize.config.username).toBe(config.test.username)
  })

  it('should use the password as defined in config', () => {
    expect(sequelize.config.password).toBe(config.test.password)
  })

  it('should use the dialect as defined in config', () => {
    expect(sequelize.connectionManager.dialectName).toBe(config.test.dialect)
  })

  it('should use the host as defined in config', () => {
    expect(sequelize.config.host).toBe(config.test.host)
  })

})

describe('sequelize - dev', () => {

  beforeEach(() => {
    jest.resetModules()
    process.env.NODE_ENV = 'dev'
    sequelize = require('../../src/db')
    delete process.env.NODE_ENV
  })

  it('should connect to a dev database when NODE_ENV=dev', () => {
    let database = sequelize.config.database
    expect(database.substr(database.length - 4)).toBe('_dev')
  })

  it('should use the database as defined in config', () => {
    expect(sequelize.config.database).toBe(config.dev.database)
  })

  it('should use the username as defined in config', () => {
    expect(sequelize.config.username).toBe(config.dev.username)
  })

  it('should use the password as defined in config', () => {
    expect(sequelize.config.password).toBe(config.dev.password)
  })

  it('should use the dialect as defined in config', () => {
    expect(sequelize.connectionManager.dialectName).toBe(config.dev.dialect)
  })

  it('should use the host as defined in config', () => {
    expect(sequelize.config.host).toBe(config.dev.host)
  })

})

describe('sequelize - production', () => {

  beforeEach(() => {
    jest.resetModules()
    process.env.NODE_ENV = 'production'
    sequelize = require('../../src/db')
    delete process.env.NODE_ENV
  })

  it('should connect to a production database when NODE_ENV=production', () => {
    let database = sequelize.config.database
    expect(database).toBe(config.production.database)
  })

  it('should use the database as defined in config', () => {
    expect(sequelize.config.database).toBe(config.production.database)
  })

  it('should use the username as defined in config', () => {
    expect(sequelize.config.username).toBe(config.production.username)
  })

  it('should use the password as defined in config', () => {
    expect(sequelize.config.password).toBe(config.production.password)
  })

  it('should use the dialect as defined in config', () => {
    expect(sequelize.connectionManager.dialectName).toBe(config.production.dialect)
  })

  it('should use the host as defined in config', () => {
    expect(sequelize.config.host).toBe(config.production.host)
  })

})