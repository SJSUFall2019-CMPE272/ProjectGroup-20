const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify
const validateToken = require('../utils/index').validateToken
const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

router.post('/', multerConfig.upload, (req, res) => {
  classify(req.file.buffer).then(response => {
    res.status(200).json(response)
  }).catch(error => {
    res.status(400).json(error)
  })
})

router.post('/save', validateToken, multerConfig.uploadToS3, (req, res) => {
  res.status(200).send('Successfully uploaded file')
})

router.get('/image/:keyimg', (req, res) => {
  AWS.config.update(
    {
      accessKeyId: process.env.aws_s3_access_key_id,
      secretAccessKey: process.env.aws_s3_secret_access_key
    }
  )
  var s3 = new AWS.S3();
  var params = { Bucket: process.env.aws_s3_bucket, Key: req.params.keyimg };
  const path = '..'
  var tempFileName = req.params.keyimg
  var tempFile = fs.createWriteStream(tempFileName)
  s3.getObject(params).createReadStream().on('error', () => {
    fs.unlink(req.params.keyimg, function (err) {
      if (err) throw err
      // if no error, file has been deleted successfully
      console.log('File deleted!')
    })
    return res.status(400).json('error')
  }).pipe(tempFile).on('finish', () => {
    // stream has ended
    return res.status(200).json('sucess')
  })
})

module.exports = router
