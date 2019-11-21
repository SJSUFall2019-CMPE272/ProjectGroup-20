const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify

router.post('/', multerConfig.saveToUploads, (req, res) => {
  classify(req.file.path).then(response => {
    res.status(200).json(response)
  }).catch(error => {
    res.status(400).json(error)
  })
})

module.exports = router
