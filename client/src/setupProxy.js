// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/pincode',
    createProxyMiddleware({
      target: 'http://postalpincode.in/',
      changeOrigin: true,
    })
  );
};
