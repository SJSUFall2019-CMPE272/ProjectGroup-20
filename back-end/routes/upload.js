const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify
const uploadS3Object = require('../utils/index').uploadS3Object
const getS3Object = require('../utils/index').getS3Object
const validateToken = require('../utils/index').validateToken
const AWS = require('aws-sdk')
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
  AWS.config.update(
    {
      accessKeyId: process.env.aws_s3_access_key_id,
      secretAccessKey: process.env.aws_s3_secret_access_key
    }
  )
  var keys = []
  var obj = {}
  var s3 = new AWS.S3()
  var allKeys = []

  function getkeys (info) {
    for (var i = 0; i < info.length; i++) {
      for (var key in info[i]) {
        for (var data in info[i][key]) {
          if (data == 'Key') {
            console.log(info[i][key][data])
            if (info[i][key][data].includes(res.locals.auth.username)) {
              keys.push(info[i][key][data])
            }
          }
        }
      }
    }
    return res.json(keys)
  }
  function listAllKeys (cb) {
    s3.listObjects({ Bucket: process.env.aws_s3_bucket }, function (err, data) {
      if (err) {
        return err
      }
      allKeys.push(data.Contents)
      getkeys(allKeys)
    })
  }
  listAllKeys(listAllKeys)
})

module.exports = router
