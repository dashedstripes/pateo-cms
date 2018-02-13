const app = require('../../src/app')
const request = require('supertest')
const page = require('../../src/models/page')

describe('GET /api/pages', () => {

  beforeEach((done) => {
    return page.sync({ force: true })
      .then(() => {
        return page.bulkCreate([
          {
            title: 'Contact'
          },
          {
            title: 'Team'
          }
        ])
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).get('/api/pages').expect(200)
  })

  it('should respond with json', () => {
    return request(app)
      .get('/api/pages')
      .expect('Content-Type', /json/)
  })

  it('should return an array of pages', () => {
    return request(app)
      .get('/api/pages')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            title: 'Contact',
            slug: 'contact'
          },
          {
            id: 2,
            title: 'Team',
            slug: 'team'
          }
        ])
      })
  })

})

describe('POST /api/pages', () => {

  beforeEach(() => page.sync({ force: true }))

  it('should return 200', () => {
    return request(app).post('/api/pages').expect(200)
  })

  it('should create an page', () => {
    return request(app)
      .post('/api/pages')
      .send({ title: 'Contact' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body.title).toBe('Contact')
        expect(res.body.slug).toBe('contact')
      })
  })

})

describe('GET /api/pages/:page_id', () => {

  beforeEach((done) => {
    return page.sync({ force: true })
      .then(() => {
        return page.create({
          title: 'Contact'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).get('/api/pages/1').expect(200)
  })

  it('should return an page from page_id', () => {
    return request(app)
      .get('/api/pages/1')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: 1,
            title: 'Contact',
            slug: 'contact'
          })
      })
  })

})

describe('PUT /api/pages/:page_id', () => {

  beforeEach((done) => {
    return page.sync({ force: true })
      .then(() => {
        return page.create({
          title: 'Contact'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).put('/api/pages/1').expect(200)
  })

  it('should update an existing page by id', () => {
    return request(app)
      .put('/api/pages/1')
      .send({ title: 'Team' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).toEqual([1])
      })
  })
})

describe('DELETE /api/pages/:page_id', () => {

  beforeEach((done) => {
    return page.sync({ force: true })
      .then(() => {
        return page.create({
          title: 'Contact'
        })
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  it('should return 200', () => {
    return request(app).delete('/api/pages/1').expect(200)
  })

  it('should delete an existing page by id', () => {
    return request(app)
      .delete('/api/pages/1')
      .then((res) => {
        expect(res.body).toEqual(1)
      })
  })
})