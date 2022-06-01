const request = require('supertest');
const app = require("../backend/home.js");

test('app module should be defined', () => {
  expect(app).toBeDefined();
});

test('GET / should return 200', () => {
  return request(app).get('/dispensa').expect(200);
});

test('GET / should return 404', () => {
  return request(app).get('/niente').expect(404);
});

test('GET / should return 403', () => {
  return request(app).get('/api/v1/users/me?token=x').expect(403);
});

test('GET / should return 400', () => {
  jest.setTimeout(8000);
  return request(app).get('/api/v1/ricette').expect();
});
