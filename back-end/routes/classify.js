const express = require('express')
const router = express.Router()
const tf =  require('@tensorflow/tfjs-node')
const tfds =  require('@tensorflow/tfjs-data')

const modelURL = "https://plantdiseasemodel.s3-us-west-1.amazonaws.com/model.json";

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

router.get('/', function (req, res) {
    prediction = predict().then(
        prediction => {
            console.log(prediction);
            res.status(200).send(prediction)
        }
    );
})

const predict = async function() {
    model = await tf.loadLayersModel(modelURL);

    model.summary();
    // TODO - convert multer image to tensor and process
    // Using placeholder tensor for now
    const processedImg = processImage();  // for example
    const logits = model.predict(processedImg);
    const prediction = logits.as1D().argMax();
    const classID = (await prediction.data())[0];

    return {
        id: classID,
        label: classes[classID]
    };
}

function processImage() {
    img = tf.ones([96, 96, 3], "float32")
    const processedImg =
        tf.tidy(() => img.expandDims(0).toFloat());
    img.dispose();
    return processedImg;
  }

module.exports = router
