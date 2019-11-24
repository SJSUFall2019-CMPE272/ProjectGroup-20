const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify
const validateToken = require('../utils/index').validateToken

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

module.exports = router
