const request  = require('supertest')
const app = require('../backend/home.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' })

token = ''
token_mal_formato = 'token mal formato'
token_sbagliato = ''
id = '628fb7b5dd8da401129b2f80'
id_mal_formato = 'id mal formato'
id_sbagliato = '629644541ecca6a12aa89395'

describe('test di /api/v1/users', () => {

    beforeAll( async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

        var payload_giusto = { email: "marco.ronchetti@unitn.it", id: "628fb7b5dd8da401129b2f80" }
        var options = { expiresIn: 86400 }
        token = jwt.sign(payload_giusto, process.env.SUPER_SECRET, options);

        var payload_sbagliato = { email: "treno@veloce.it", id: "629644541ecca6a12aa89395" }
        token_sbagliato = jwt.sign(payload_sbagliato, process.env.SUPER_SECRET, options)

      });

    afterAll( () => {
        mongoose.connection.close(true);
      });
    
    ///////////////////////
    test('GET /api/v1/users/me con token in header', async () => {
        return request(app)
            .get('/api/v1/users/me')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/me con token come parametro url', async () => {
        return request(app)
            .get('/api/v1/users/me?token=' + token)
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/me con token nel body della request', async () => {
        return request(app)
            .get('/api/v1/users/me')
            .send({token: token})
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

    ///////////////////////

    test('GET /api/v1/users/me con token mal formato in header', async () => {
        return request(app)
            .get('/api/v1/users/me')
            .set('x-access-token', token_mal_formato)
            .set('Accept', 'application/json')
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/me con token mal formato come parametro url', async () => {
        return request(app)
            .get('/api/v1/users/me?token=' + token_mal_formato)
            .set('Accept', 'application/json')
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/me con token mal formato nel body della request', async () => {
        return request(app)
            .get('/api/v1/users/me')
            .send({token: token_mal_formato})
            .set('Accept', 'application/json')
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

    ///////////////////////

    test('GET /api/v1/users/con id giusto e token giusto', async () => {
        return request(app)
            .get('/api/v1/users/' + id)
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })
    
    test('GET /api/v1/users/con id giusto ma senza token', async () => {
        return request(app)
            .get('/api/v1/users/' + id)
            .set('x-access-token', '')
            .set('Accept', 'application/json')
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/senza id con token giusto', async () => {
        return request(app)
            .get('/api/v1/users/')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(404)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/con id mal formato e token giusto', async () => {
        return request(app)
            .get('/api/v1/users/' + id_mal_formato)
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/con id sbagliato e token giusto', async () => {
        return request(app)
            .get('/api/v1/users/' + id_sbagliato)
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/con id giusto e token mal formato', async () => {
        return request(app)
            .get('/api/v1/users/' + id)
            .set('x-access-token', token_mal_formato)
            .set('Accept', 'application/json')
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('GET /api/v1/users/con id giusto e token sbagliato', async () => {
        return request(app)
            .get('/api/v1/users/' + id)
            .set('x-access-token', token_sbagliato)
            .set('Accept', 'application/json')
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })

    ///////////////////////

    test('GET /api/v1/users senza /me', async () => {
        return request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })
})