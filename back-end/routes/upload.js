const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify
const uploadS3Object = require('../utils/index').uploadS3Object
const getS3Object = require('../utils/index').getS3Object
const validateToken = require('../utils/index').validateToken
require('dotenv').config()

router.post('/', multerConfig.upload, (req, res) => {
  classify(req.file.buffer).then(response => {
    res.status(200).json(response)
  }).catch(error => {
    res.status(400).json(error)
  })
})

router.post('/save', validateToken, multerConfig.upload, (req, res) => {
  const s3Name = res.locals.auth.username + '/' + req.file.originalname
  uploadS3Object(s3Name, req.file.buffer).then(() => {
    res.status(200).send('Successfully uploaded file')
  }).catch(err => {
    res.status(400).send(err)
  })
})

router.get('/image/:keyimg', validateToken, (req, res) => {
  const s3Name = res.locals.auth.username + '/' + req.params.keyimg
  getS3Object(s3Name).then((data) => {
    res.status(200).send(data)
  }).catch(err => {
    res.status(400).send(err)
  })
})

router.get('/list', validateToken, (req, res) => {
  const s3Name = res.locals.auth.username 
  getS3list(s3Name).then((data) => {
    res.status(200).send(data)
  }).catch(err => {
    res.status(400).send(err)
  })
})

module.exports = router
