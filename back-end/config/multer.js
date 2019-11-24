
const multer  = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk'),
    fs = require('fs');


const s3Config = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
    Bucket: ''
  });

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: '',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,

})

module.exports = {
    saveToUploads: upload.single('file')
}

/*const multer = require('multer')

const diskStorageToUploads = multer.diskStorage({
  destination: 'uploads/'
})

const saveToUploads = multer({ storage: diskStorageToUploads })

module.exports = {
  saveToUploads: saveToUploads.single('file')
}*/
