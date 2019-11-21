var jwt = require('jsonwebtoken')
var jwkToPem = require('jwk-to-pem')
require('dotenv').config()

function validateToken (req, res, next) {
  fetch(`${process.env.cognito_issuer}/${process.env.cognito_pool_id}/.well-known/jwks.json`)
    .then(res => {
      return res.json()
    })
    .then(body => {
      var pems = {}
      var keys = body.keys
      for (var i = 0; i < keys.length; i++) {
        var keyId = keys[i].kid
        var modulus = keys[i].n
        var exponent = keys[i].e
        var keyType = keys[i].kty
        var jwk = { kty: keyType, n: modulus, e: exponent }
        var pem = jwkToPem(jwk)
        pems[keyId] = pem
      }

      var decodedJwt = jwt.decode(req.headers.token, { complete: true })
      if (!decodedJwt) {
        return res.status(401).send('Not a valid jwt token!')
      }

      var kid = decodedJwt.header.kid
      pem = pems[kid]
      if (!pem) {
        return res.status(401).send('Invalid token')
      }

      jwt.verify(req.headers.token, pem, function (err, payload) {
        if (err) {
          return res.status(401).send('Invalid Token.')
        } else {
          next()
        }
      })
    })
    .catch(() => {
      return res.status(401).send('Error while validating token!')
    })
}

exports.validateToken = validateToken
