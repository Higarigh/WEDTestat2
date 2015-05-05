"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var linkHandler = require("./linkHandler.js");
var userHandler = require("./loginHandler.js");

app.use(cookieParser());
app.use(session({
    secret: "ramifhirbfwifbnq",
    cookie: {maxAge: 1000*3600},
    resave: false,
    saveUninitialized: false
}));

//Sample Data
createSampleData();


app.use(bodyParser.json());

app.get('/links', function(req, res, next) {

    renderData(res,linkHandler.getAllLinks());

});

app.get('/links/:id', function(req, res, next) {

    renderData(res,linkHandler.getLink(req.params.id));

});

app.get('/login' , function(req, res, next) {

    if (typeof (req.session.user_id) == "number") {
		renderData(res,{"name":userHandler.getLogin(req.session.user_id).name,"Message":"Successfully logged in"});
    }else{
		renderData(res,{"Message":"No user logged in"})
	}

});

app.get('/register' , function(req, res, next) {

    renderData(res,userHandler.getUsers());

});

app.post('/links/:id/up', function(req, res, next) {

    if(linkHandler.linkVoteUp(req.params.id)){
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }

});

app.post('/links/:id/down', function(req, res, next) {

    if(linkHandler.linkVoteDown(req.params.id)){
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }

});

app.post('/links', function(req, res, next) {

    linkHandler.createNewLink(req.body.title, req.body.url,req.body.username);
    res.redirect("/links");

});

app.post('/links/:id', function(req, res, next) {

    if(linkHandler.updateLink(req.param.id)){
        res.redirect("/links/" + req.param.id);
    } else{
        res.redirect("/links");
    }

});

app.post('/register', function(req, res, next){

    userHandler.createLogin(req.body.username, req.body.password);
    res.redirect("/register");

});

app.post('/login', function(req, res, next){

    var userId = userHandler.logInUser(req.body.username, req.body.password);
    if(typeof (userId) == "number"){
        req.session.user_id = userId;
		renderData(res,true);
    }else{
		renderData(res,"Couldn't authenticate you")
	}
});

app.post('/logout', function(req, res, next){

	req.session.user_id = null;
	renderData(res,true);

});

app.put('/links', function(req, res, next) {

    var temp = linkHandler.createNewLink(req.body.title,req.body.url,req.body.username);

    renderData(res,temp);

});


app.delete('/links/:id', function(req, res, next) {

    var temp = linkHandler.removeLink(req.params.id);

    renderData(res,temp);

});

function renderData(res, data) {
    res.writeHead(200, {
        "Content-Type" : "application/json"
    });

    res.end(JSON.stringify({
        data : data || null
    }));
}
function createSampleData(){

    linkHandler.createNewLink("Google","http://www.google.com","Generator");

    linkHandler.createNewLink("Facebook","http://www.facebook.com","Generator");

    linkHandler.createNewLink("HSR","http://www.hsr.ch","Generator");

    userHandler.createLogin("test","test");

    userHandler.createLogin("mgabriel","password");

}
/*
var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

module.exports = app;
