const multer = require('multer')

const diskStorageToUploads = multer.diskStorage({
  destination: 'uploads/'
})

const saveToUploads = multer({ storage: diskStorageToUploads })

module.exports = {
  saveToUploads: saveToUploads.single('file')
}
