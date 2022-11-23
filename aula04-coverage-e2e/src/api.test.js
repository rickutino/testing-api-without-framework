const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const { deepStrictEqual } = require('assert')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async() => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      deepStrictEqual(response.text, 'contact up page')
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async() => {
      const response = await request(app)
        .get('/hi')
        .expect(200)
      deepStrictEqual(response.text, 'Hello World!')
    })
  })

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async() => {
      const response = await request(app)
        .post('/login')
        .send({ username: "Ricardo", password: "123456" })
        .expect(200)

      deepStrictEqual(response.text, 'Logging has succeeded!')
    })
    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async() => {
      const response = await request(app)
        .post('/login')
        .send({ username: "Xuxa", password: "45678" })
        .expect(401)

      deepStrictEqual(response.text, 'Logging failed!')
    })
  })
})