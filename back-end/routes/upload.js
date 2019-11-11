const multerConfig = require("../config/multer");
const express = require('express');
const router = express.Router()

router.post('/', multerConfig.saveToUploads, (req, res) => {
    return res.json("file uploaded successfully");
});

module.exports = router;
