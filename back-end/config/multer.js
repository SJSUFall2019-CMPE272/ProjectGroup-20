const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const s3Config = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: '',
  Bucket: ''
})

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: '',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const uploadS3 = multer({
  storage: multerS3Config
})

const upload = multer()

module.exports = {
  uploadToS3: uploadS3.single('file'),
  upload: upload.single('file')
}
