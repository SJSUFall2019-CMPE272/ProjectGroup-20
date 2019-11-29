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
global.fetch = require('node-fetch')

var app = express()
const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('*', express.static(path.join(__dirname, 'public')))

// TODO: ideally, this should only be used in development environment
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/upload', uploadRouter)
app.use('/test', validateToken, testRouter)
app.use('/auth', authRouter)
app.use('/classify', classifyRouter)

// TODO: to implement a protected route, use the validateToken middleware
// app.use('/', validateToken, indexRouter)

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
