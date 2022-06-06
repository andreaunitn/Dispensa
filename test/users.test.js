const request  = require('supertest')
const app = require('../backend/home.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' })

token = ''
token_mal_formato = 'token mal formato'
token_sbagliato = ''

id = '6292487a3e1677457fa6956d'
id_sbagliato = '629644541ecca6a12aa89395'

ingredienti = "farina,latte,banana,mela"
ingredienti_mal_formato = ["farina","latte","banana","mela"]
ingredienti_vuoto = ""

describe('test di /api/v1/users', () => {

    beforeAll( async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

        var payload_giusto = { email: "test@test.it", id: id }
        var options = { expiresIn: 86400 }
        token = jwt.sign(payload_giusto, process.env.SUPER_SECRET, options);

        var payload_sbagliato = { email: "treno@veloce.it", id: id_sbagliato }
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

    ///////////////////////

    test('PUT /api/v1/users/me con ingredienti nel formato giusto e token giusto', async () => {
        return request(app)
            .put('/api/v1/users/me')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti})
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

//ERRORE DA FIXARE
    test('PUT /api/v1/users/me con ingredienti nel formato sbagliato e token giusto', async () => {
        return request(app)
            .put('/api/v1/users/me')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti_mal_formato})
            .expect(400)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('PUT /api/v1/users/me con ingredienti vuoti e token giusto', async () => {
        return request(app)
            .put('/api/v1/users/me')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti_vuoto})
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

    ///////////////////////

    test('PUT /api/v1/users/ con id giusto, token giusto e ingredienti nel formato giusto', async () => {
        return request(app)
            .put('/api/v1/users/' + id)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti})
            .expect(200)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('PUT /api/v1/users/ id giusto, token mal formato e ingredienti nel formato giusto', async () => {
        return request(app)
            .put('/api/v1/users/' + id)
            .set('Accept', 'application/json')
            .set('x-access-token', token_mal_formato)
            .send({ingredienti: ingredienti})
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

//ERRORE DA FIXARE
    test('PUT /api/v1/users/ id giusto, token giusto e ingredienti nel formato sbagliato', async () => {
        return request(app)
            .put('/api/v1/users/' + id)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti_mal_formato})
            .expect(403)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('PUT /api/v1/users/ senza id, token giusto e ingredienti nel formato giusto', async () => {
        return request(app)
            .put('/api/v1/users/')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .send({ingredienti: ingredienti})
            .expect(404)
            .then((response) => {
                console.log(response.text)
             });
    })

    test('PUT /api/v1/users/ id giusto, token sbagliato e ingredienti nel formato giusto', async () => {
        return request(app)
            .put('/api/v1/users/' + id)
            .set('Accept', 'application/json')
            .set('x-access-token', token_sbagliato)
            .send({ingredienti: ingredienti})
            .expect(401)
            .then((response) => {
                console.log(response.text)
             });
    })
    
})
