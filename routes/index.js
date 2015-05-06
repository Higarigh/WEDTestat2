var express = require('express');
var router = express.Router();
var handler = require("../linkHandler.js")

/* GET home page. */
router.get('/', function(req, res, next) {

	res.redirect("/linkit");

});

router.get("/linkit", function(req, res, next){

      res.render('linkit' , { links: handler.getAllLinks(), title:'Reddit Clone 2.0'});

});

module.exports = router;
