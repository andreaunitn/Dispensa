const request = require('supertest');
const app = require('../backend/home.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

describe('GET /api/v1/notfound', () => {

  let connection;

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  });

  afterAll( () => {
    mongoose.connection.close(true);
  });

  test('GET /api/v1/pagina con pagina non esistente', () => {
    return request(app)
      .get('/api/v1/notfound')
      .set('Accept', 'application/json')
      .expect(404)
  });
});
