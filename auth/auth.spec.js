const request = require('supertest');
const server = require('../api/server.js');

describe('authRouter', () => {
  describe('POST /register', () => {
    it('returns JSON', () => {
      request(server)
        .post('/api/auth/register')
        .send({ username: 'bookishbookr', password: 'abc123' })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  describe('POST /login', () => {
    it('returns JSON', () => {
      request(server)
        .post('/api/auth/login')
        .send({ username: 'bookishbookr', password: 'abc123' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
