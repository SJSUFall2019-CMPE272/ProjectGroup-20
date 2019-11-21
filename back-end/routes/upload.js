const multerConfig = require('../config/multer')
const express = require('express')
const router = express.Router()
const classify = require('../utils/index').classify

router.post('/', multerConfig.saveToUploads, (req, res) => {
  classify(req.file.path).then(res => {
    return res.status(200).json(res)
  }).catch(err => {
    return res.status(400).json(err)
  })
})

module.exports = router
