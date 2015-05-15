var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Maker = require('../models/maker.js')

 router.post('/', function(req, res, next) {
  Maker.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
