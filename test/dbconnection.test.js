const request = require('supertest');
const app = require('../backend/home.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('GET /api/v1/bochenesoio', () => {

  let connection;

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  });

  afterAll( () => {
    mongoose.connection.close(true);
  });

  var token = jwt.sign(
    {email: 'John@mail.com'},
    process.env.SUPER_SECRET,
    {expiresIn: 86400}
  );

  test('POST /api/v1/authentication/login with No user specified', () => {
    return request(app).post('/api/v1/authentication/login').set('x-access-token', token).set('Accept', 'application/json').expect(401, { success: false, message:"Utente non trovato" });
  });

});