const request  = require('supertest');
const app      = require('../backend/home.js');
const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

describe('/api/v1/authentication', () => {

  login = {
    email: "marco.ronchetti@unitn.it",
    password: "webengine"
  }

  user = {
    email: "marco.ronchetti@unitn.it",
    id: "628fb7b5dd8da401129b2f80",
    self: "/api/v1/users/628fb7b5dd8da401129b2f80"
  }

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Database connected!');
    let payload = { email: login.email, id: user.id }
    let options = { expiresIn: 86400 } // expires in 24 hours
    token = jwt.sign(payload, process.env.SUPER_SECRET, options);
  })

  afterAll( () => {
    mongoose.connection.close(true);
    console.log("Database connection closed");
  })


  test('app module should be defined', () => {
    expect(app).toBeDefined();
  })

  test('POST /api/v1/authentication/login corretto', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: 'webengine'})
      .expect(200)
      .then((response) => {
        var json = JSON.parse(response.text)
        expect(json.success).toBe(true)
        expect(json.message).toBe("Loggato correttamente")
        expect(json.email).toBe(user.email)
        expect(json.id).toBe(user.id)
        expect(json.self).toBe(user.self)
      });
  })

  test('POST /api/v1/authentication/login utente non esistente', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: 'chvjgjvhkjg', password: login.password})
      .expect(401);
  })

  test('POST /api/v1/authentication/login password errata', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: 'fcvgxcvjkh'})
      .expect(401);
  })

  test('POST /api/v1/authentication/login utente con caratteri strani nella mail', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: 'svk_$..:/n"dk s2#s}<è\|-+>[?ì^', password: login.password})
      .expect(401);
  })

  test('POST /api/v1/authentication/login utente con spassword vuota', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: ''})
      .expect(401);
  })

  test('POST /api/v1/authentication/login utente con email vuota', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: '', password: login.password})
      .expect(401);
  })



})
