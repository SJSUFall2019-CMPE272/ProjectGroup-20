const express = require('express');
const router = express.Router()

router.get("/", function (req, res) {
  res.status(200).send({ message: 'Welcome to our restful API' });
});

router.get("/user", function (req, res) {
  var data = ({
    firstName: "first_name",
    lastName: "last_name",
    username: "sample_username",
    email: "email"
  });
  res.status(200).send(data);
});

router.get("/users/:num", function (req, res) {
  var users = [];
  var num = req.params.num;
  
  if (isFinite(num) && num  > 0 ) {
    for (i = 0; i <= num-1; i++) {
      users.push({
        firstName: "first_name",
        lastName: "last_name",
        username: "sample_username",
        email: "email"
      });
    }
    res.status(200).send(users);
  } else {
    res.status(400).send({ message: 'invalid number supplied' });
  }
});

module.exports = router;
