const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://simontan.auth0.com/.well-known/jwks.json'
  }),
  audience: 'shopping',
  issuer: 'https://simontan.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
