module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'LaDispensa',
    version: '1.0.0',
    description:
      'API ufficiali di LaDispensa',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'https://ladispensa.herokuapp.com',
      description: 'Development server',
    },
  ],
};