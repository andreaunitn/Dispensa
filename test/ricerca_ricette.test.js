const request  = require('supertest');
const app      = require('../backend/home.js');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

describe('GET /api/v1/ricette', () => {

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

  test('GET /api/v1/ricette senza parametri', () => {
    return request(app)
      .get('/api/v1/ricette')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {

         expect(response.text.length).toBeGreaterThan(0)
      });
  });

  test('GET /api/v1/ricette con parametri non previsti', async () => {
    return request(app)
      .get('/api/v1/ricette?qualcosa=caso')
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {

        var json = JSON.parse(response.text)

        expect(json.error).toBe("Richiesta malformata")
      });
  });

  test('GET /api/v1/ricette con parametri nel formato sbagliato', () => {
    return request(app)
      .get('/api/v1/ricette?ingredienti=bad_format')
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {

        var json = JSON.parse(response.text)

        expect(json.error).toBe("Richiesta malformata")
      });
  });

  test('GET /api/v1/ricette con più di un parametro: e.g. titolo e ingredienti', async () => {
    return request(app)
      .get('/api/v1/ricette?titolo=pane&ingredienti={"ingredienti":["farina","acqua","sale","lievito","pomodoro","calore","mozzarella"]}')
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        var json = JSON.parse(response.text)

        expect(json.error).toBe("Richiesta malformata")
      })
  });

  test('GET /api/v1/ricette/id con id sbagliato', async () => {
    return request(app)
      .get('/api/v1/ricette/fake_id')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        var json = JSON.parse(response.text)

        expect(json.error).toBe("Ricetta non esiste")
      })
  });

  test('GET /api/v1/ricette/id con id corretto ma con altri parametri', async () => {
    return request(app)
      .get('/api/v1/ricette/628417a48422dcf8395be4ef?altri=parametri')
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        var json = JSON.parse(response.text)

        expect(json.error).toBe("Richiesta malformata")
      })
  });

});
