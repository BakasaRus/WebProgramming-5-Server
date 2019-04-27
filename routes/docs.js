var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/docs',
    { useNewUrlParser: true, useCreateIndex: true, }
).catch(error => console.error(error));

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
