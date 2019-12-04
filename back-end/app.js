var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
// var indexRouter = require('./routes/index')
var uploadRouter = require('./routes/upload')
var authRouter = require('./routes/auth')
var testRouter = require('./routes/test')
var classifyRouter = require('./routes/classify')
var validateToken = require('./utils/index').validateToken
var path = require('path')
var cors = require('cors')
global.fetch = require('node-fetch')

var app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/classify', classifyRouter)
app.use('/upload', uploadRouter)
app.use('/test', validateToken, testRouter)
app.use('/auth', authRouter)
app.use(express.static(path.join(__dirname, 'public')))
app.use('*', express.static(path.join(__dirname, 'public')))

// TODO: to implement a protected route, use the validateToken middleware
// app.use('/', validateToken, indexRouter)

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
