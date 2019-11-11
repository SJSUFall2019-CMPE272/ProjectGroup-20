var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan');
var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var authRouter = require('./routes/auth');

var app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/upload', uploadRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});
