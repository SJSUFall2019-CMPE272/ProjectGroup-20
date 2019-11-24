const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
require('dotenv').config()

const s3Config = new AWS.S3({
  accessKeyId: process.env.aws_s3_access_key_id,
  secretAccessKey: process.env.aws_s3_secret_access_key,
  Bucket: process.env.aws_s3_bucket
})

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.aws_s3_bucket,
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
