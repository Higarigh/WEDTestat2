var express = require('express');
var router = express.Router();
var handler = require("../linkHandler.js")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/linkit", function(req, res, next){
      res.render('linkit' , { links: handler.getAllLinks(), title:'linkit', username:'testuser' });
});

module.exports = router;
