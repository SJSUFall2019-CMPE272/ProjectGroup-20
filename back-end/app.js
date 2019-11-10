var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan');
var routes = require("./routes/routes.js");

var app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});
