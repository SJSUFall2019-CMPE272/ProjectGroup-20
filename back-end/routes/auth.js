const express = require('express')
const router = express.Router()
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
require('dotenv').config()

const poolData = {
  UserPoolId: process.env.cognito_pool_id,
  ClientId: process.env.cognito_client_id
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

router.get('/signin', (req, res) => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username: req.body.username, Pool: userPool })
  cognitoUser.authenticateUser(new AmazonCognitoIdentity.AuthenticationDetails({ Username: req.body.username, Password: req.body.password }), {
    onSuccess: function (result) {
      console.log(result)
      return res.send({ accessToken: result.getAccessToken().getJwtToken() })
    },
    onFailure: function (err) {
      return res.status(400).send(err)
    }
  })
})

router.get('/signout', (req, res) => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username: req.body.username, Pool: userPool })
  if (cognitoUser != null) {
    cognitoUser.signOut()
    return res.status(200).send('Signed out user.')
  } else {
    return res.status(400).send('Error while signing out user.')
  }
})

router.post('/register', (req, res) => {
  const attributeList = []
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: req.body.email }))
  userPool.signUp(req.body.username, req.body.password, attributeList, null, (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.send(result.user.getUsername())
  })
})

router.post('/confirm', (req, res) => {
  const userData = {
    Username: req.body.username,
    Pool: userPool
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.confirmRegistration(req.body.confirmationCode, true, (err, result) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.send(result)
  })
})

module.exports = router
