const request  = require('supertest');
const app      = require('../backend/home.js');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

describe('GET /api/v1/ingredients', () => {

  let connection;

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');

  });

  afterAll( () => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('GET /api/v1/ingredients richiesta corretta', () => {
    return request(app)
      .get('/api/v1/ingredients')
      .set('Accept', 'application/json')
      .expect(200)
  });

  test('GET /api/v1/ingredients?parametro con parametro non previst0', async () => {
    return request(app)
      .get('/api/v1/ingredients?parametro')
      .set('Accept', 'application/json')
      .expect(400, {error:"Richiesta malformata"});
  });

});
