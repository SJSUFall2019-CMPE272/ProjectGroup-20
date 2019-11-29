const express = require('express')
const router = express.Router()
const tf = require('@tensorflow/tfjs-node')
const tfds = require('@tensorflow/tfjs-data')
const jpeg = require('jpeg-js')
const multerConfig = require('../config/multer')
const getS3Object = require('../utils/index').getS3Object
const validateToken = require('../utils/index').validateToken

const modelURL = 'https://plantdiseasemodel.s3-us-west-1.amazonaws.com/model.json'

const classes = ['Potato___Early_blight',
  'Pepper__bell___healthy',
  'Tomato_Leaf_Mold',
  'Potato___healthy',
  'Tomato_healthy',
  'Pepper__bell___Bacterial_spot',
  'Tomato_Late_blight',
  'Tomato_Early_blight',
  'Tomato_Bacterial_spot',
  'Potato___Late_blight',
  'Tomato_Spider_mites_Two_spotted_spider_mite',
  'Tomato__Target_Spot',
  'Tomato__Tomato_mosaic_virus',
  'Tomato_Septoria_leaf_spot',
  'Tomato__Tomato_YellowLeaf__Curl_Virus']

router.post('/', multerConfig.upload, function (req, res) {
  prediction = predict(req.file.buffer).then(
    prediction => {
      console.log(prediction)
      res.status(200).send(prediction)
    }
  )
})

router.get('/:keyimg', validateToken, function (req, res) {
  const s3Name = res.locals.auth.username + '/' + req.params.keyimg
  getS3Object(s3Name).then((data) => {
    predict(data.Body).then(
      prediction => {
        console.log(prediction)
        res.status(200).send({ prediction: prediction, data: data.Body })
      }
    )
  }).catch(err => {
    res.status(400).send(err)
  })
})

const predict = async function (data) {
  // const image = jpeg.decode(data.buf, true);
  model = await tf.loadLayersModel(modelURL)

  model.summary()
  // TODO - convert multer image to tensor and process
  // Using placeholder tensor for now
  console.log(data)
  const processedImg = processImage(data) // for example
  const logits = model.predict(processedImg)
  const prediction = logits.as1D().argMax()
  const classID = (await prediction.data())[0]

  return {
    id: classID,
    label: classes[classID]
  }
}

function processImage (img) {
  img_decoded = jpeg.decode(img, true)
  console.log(img_decoded.data)

  img_no_alhpa = img_decoded.data.filter((elem, i) => (i % 4) != 3)
  // img_tensor = tf.ones([256, 256, 3], "float32");
  img_tensor = tf.tensor(img_no_alhpa, [256, 256, 3], 'float32')
  img_tensor.print()
  const processedImg =
        tf.tidy(() => tf.image.resizeBilinear(img_tensor.expandDims(0),
          [96, 96]))
  img_tensor.dispose()
  return processedImg
}

module.exports = router
