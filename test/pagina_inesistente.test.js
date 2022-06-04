const request  = require('supertest');
const app      = require('../backend/home.js');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

//init test suite
describe('GET /api/v1/notfound', () => {

  let connection;

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');
    //return connection; // Need to return the Promise db connection?
  });

  afterAll( () => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('GET /api/v1/pagina con pagina non esistente', () => {
    return request(app)
      .get('/api/v1/notfound')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
         var json = JSON.parse(response.text)

         expect(json.error).toBe("Not found")
      });
  });



});
