const request  = require('supertest');
const app      = require('../backend/home.js');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('GET /api/v1/bochenesoio', () => {

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

  var token = jwt.sign(
    {email: 'John@mail.com'},
    process.env.SUPER_SECRET,
    {expiresIn: 86400}
  );

  test('POST /api/v1/authentication/login with No user specified', () => {
    return request(app).post('/api/v1/authentication/login').set('x-access-token', token).set('Accept', 'application/json').expect(401, { success: false, message:"Utente non trovato" });
  });

  // test('POST /api/v1/user psw errata', () => {
  //   return request(app)
  //     .post('/api/v1/authentication/login')
  //     .set('x-access-token', token)
  //     .set('Accept', 'application/json')
  //     .send({ user: 'marco' }) // sends a JSON post body
  //     .expect(400, { error: 'mail not specified' });
  // });
  //
  // test('POST /api/v1/user mail errata', () => {
  //   return request(app)
  //     .post('/api/v1/authentication/login')
  //     .set('x-access-token', token)
  //     .set('Accept', 'application/json')
  //     .send({ user: '/api/v1/users/me/' }) // sends a JSON post body
  //     .expect(400, { error: 'user does not exist' });
  // });
  //
  // test('POST /api/v1/user inesistente', () => {
  //   return request(app)
  //     .get('/api/v1/authentication/login')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then( (res) => {
  //       return request(app)
  //         .post('/api/v1/authentication/login')
  //         .set('x-access-token', token)
  //         .set('Accept', 'application/json')
  //         .send({ user: res.body[0].self}) // sends a JSON post body
  //         .expect(400, { error: 'user does not exist' });
  //     });
  // });

});
