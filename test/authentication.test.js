const request = require('supertest');
const app = require('../backend/home.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

describe('/api/v1/authentication', () => {

  login = {
    email: "mario.rossi@unitn.it",
    password: "admin"
  }

  registration = {
    nome: "test",
    cognome: "test",
    email: "",
    password: "test"
  }

  user = {
    email: "mario.rossi@unitn.it",
    id: "629e2de52b2ee81adfe55ef9",
    self: "/api/v1/users/629e2de52b2ee81adfe55ef9"
  }

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    let payload = { email: login.email, id: user.id }
    let options = { expiresIn: 86400 } // expires in 24 hours
    token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    registration.email = "test" + Math.floor(Math.random() * 1000000000) + "@test.ts";
  })

  afterAll( () => {
    mongoose.connection.close(true);
  })

  test('app module should be defined', () => {
    expect(app).toBeDefined();
  })

  test('POST /api/v1/authentication/login corretto', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: login.password})
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

  test('POST /api/v1/authentication/login utente con parametri extra', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: login.password, extra: "boh"})
      .expect(400);
  })

  test('POST /api/v1/authentication/registration corretta', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: registration.email, password: registration.password,
              nome: registration.nome, cognome: registration.cognome})
      .expect(201)
      .then((response) => {
        var json = JSON.parse(response.text)
        expect(json.success).toBe(true)
        expect(json.message).toBe("Registrato correttamente")
        expect(json.email).toBe(registration.email)
      });
  })

  test('POST /api/v1/authentication/registration con email mancante', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: "", password: registration.password,
              nome: registration.nome, cognome: registration.cognome})
      .expect(400)
  })

  test('POST /api/v1/authentication/registration con password mancante', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: registration.email, password: "",
              nome: registration.nome, cognome: registration.cognome})
      .expect(400)
  })

  test('POST /api/v1/authentication/registration con nome mancante', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: registration.email, password: registration.password,
              nome: "", cognome: registration.cognome})
      .expect(400)
  })

  test('POST /api/v1/authentication/registration con cognome mancante', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: registration.email, password: registration.password,
              nome: registration.nome, cognome: ""})
      .expect(400)
  })

  test('POST /api/v1/authentication/registration con email già utilizzata', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: login.email, password: registration.password,
              nome: registration.nome, cognome: registration.cognome})
      .expect(401)
  })

  test('POST /api/v1/authentication/registration con email non conforme', () => {
    return request(app)
      .post('/api/v1/authentication/register')
      .set('Accept', 'application/json')
      .send({email: "ciao", password: registration.password,
              nome: registration.nome, cognome: registration.cognome})
      .expect(400)
  })

  test('POST /api/v1/authentication/login corretto con token in header', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send({email: login.email, password: login.password})
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

  test('POST /api/v1/authentication/login utente non esistente con token in header', () => {
    return request(app)
      .post('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send({email: 'chvjgjvhkjg', password: login.password})
      .expect(401);
  })

  test('GET /api/v1/authentication/login', () => {
    return request(app)
      .get('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: login.password})
      .expect(404);
  })

  test('POST /api/v1/authentication/', () => {
    return request(app)
      .get('/api/v1/authentication/login')
      .set('Accept', 'application/json')
      .send({email: login.email, password: login.password})
      .expect(404);
  })

})