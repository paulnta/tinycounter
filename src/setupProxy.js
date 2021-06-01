const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('http://localhost:4000/graphql', { ws: true }))
}
