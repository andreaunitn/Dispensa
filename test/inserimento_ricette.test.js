const request = require('supertest');
const app = require('../backend/home.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

describe('POST /api/v1/ricette', () => {

  let connection;

  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  });

  afterAll( () => {
    mongoose.connection.close(true);
  });

  test('POST /api/v1/ricette con parametri corretti', () => {
    return request(app)
      .post('/api/v1/ricette')
      .set('Accept', 'application/json')
      .send({titolo:'Banane zucchero e limone1',
            descrizione:'un semplice dolce! tagliare a fette la banana e condirla con zucchero e limone',
            ingredienti:['banana','zucchero','limone'],
            num_per:4,
            energia:400})
      .expect(201)
  });

  test('POST /api/v1/ricette con parametri mancanti', () => {
    return request(app)
      .post('/api/v1/ricette')
      .set('Accept', 'application/json')
      .send({titolo:'Banane zucchero e limone1',
            descrizione:'un semplice dolce! tagliare a fette la banana e condirla con zucchero e limone',
            ingredienti: '',
            num_per:4,
            energia:400})
      .expect(400)
      .then((response) => {
         var json = JSON.parse(response.text)
         expect(json.error).toBe("Richiesta malformata")
      });
  });

  test('POST /api/v1/ricette con parametro ingrediente nel formato errato', () => {
    return request(app)
      .post('/api/v1/ricette')
      .set('Accept', 'application/json')
      .send({titolo:'Banane zucchero e limone1',
            descrizione:'un semplice dolce! tagliare a fette la banana e condirla con zucchero e limone',
            ingredienti: 'ingrediente',
            num_per:4,
            energia:400})
      .expect(400)
      .then((response) => {
         var json = JSON.parse(response.text)
         expect(json.error).toBe("Richiesta malformata")
      });
  });

  test('POST /api/v1/ricette con parametri aggiuntivi (non previsti)', () => {
    return request(app)
      .post('/api/v1/ricette')
      .set('Accept', 'application/json')
      .send({titolo:'Banane zucchero e limone',
            descrizione:'un semplice dolce! tagliare a fette la banana e condirla con zucchero e limone',
            ingredienti: ['banana','zucchero','limone'],
            num_per:4,
            energia:400,
            ulteriore: 'parametro'})
      .expect(400)
      .then((response) => {
         var json = JSON.parse(response.text)
         expect(json.error).toBe("Richiesta malformata")
      });
  });
});