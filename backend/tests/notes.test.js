const supertest = require('supertest')
const app = require('../src/main')

const api = supertest(app)

test('notes are returned as json', () => {
    api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})