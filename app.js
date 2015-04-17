var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var Link = require("./link.js");

var links = [];
//Sample Data
createSampleData();


app.use(bodyParser.json());
app.get('/links', function(req, res) {
    /*res.format({
        'text/plain': function(){
            res.send(JSON.stringify(links));
        },
        'text/html': function(){
            res.render("index", {title: links[0].url});
        },
        'application/json': function(){
            res.json(links);
        },
        'default': function() {
            res.render("index", {notes: links});
        }
    });*/
    renderData(res,links);

});

app.get('/links/:id', function(req, res) {
    renderData(res,links[req.params.id]);
    /*
     var entityId = req.params.id;
    res.format({
        'text/plain': function(){
            res.send(JSON.stringify(links[entityId]));
        },
        'text/html': function(){
            res.render("index", {title: links[entityId].url});
        },
        'application/json': function(){
            res.json(links[entityId]);
        },
        'default': function() {
            res.render("index", {notes: links[entityId]});
        }
    });
    */
});

app.post('/links/:id/up', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    if (data){
        data.rating._up();
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }
});

app.post('/links/:id/down', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    if (data){
        data.rating._down();
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }

});
app.post('/links', function(req, res) {
    var temp = new Link(links.length,req.body.title,req.body.username, req.body.url);
    links.push(temp);
    res.redirect("/links");
});
app.post('/links/:id', function(req, res) {
    var entityId = Number(req.params.id);
    if(links[entityId]){
        links[entityId]._update(req.body.title,req.body.username, req.body.url);
    }else{
        var temp = new Link(links.length,req.body.title,req.body.username, req.body.url);
        links.push(temp);
    }

    res.redirect("/links/" + entityId);
});
/*
app.post('/links', function(req, res) {

    readData(req, function(data) {
        if (data) {
            var entityId = links.length;
            links[entityId] = data;
            data.id = entityId;
        }
        renderData(res, data);
    });

});
*/
app.put('/links', function(req, res) {
    var temp = new Link(links.length,req.body.title,req.body.username, req.body.url);
    links.push(temp);
    res.redirect("/links");
});


app.delete('/links/:id', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    links.splice(entityId, 1);
    req.redirect("/links")
});
/*
function readData(req, callback) {
    var body = '';
    req.on(
        'readable' ,
        function () {
            var rawBody = req.read();
            if (rawBody) {
                if (typeof rawBody === 'string') {
                    body += rawBody;
                } else if (typeof rawBody === 'object' && rawBody instanceof Buffer) {
                    body += rawBody.toString('utf8');
                }
            }
        });
    req.on(
        'end',
        function() {
            callback(body ? JSON.parse(body) : null);
        });
}
*/
function renderData(res, data) {
    res.writeHead(200, {
        "Content-Type" : "application/json"
    });

    res.end(JSON.stringify({
        data : data || null
    }));
}
function createSampleData(){
    var temp = new Link(links.length,"Google","Generator","www.google.com");
    links.push(temp);
    var temp = new Link(links.length,"Facebook","Generator","www.facebook.com");
    links.push(temp);
    var temp = new Link(links.length,"HSR","Generator","www.hsr.ch");
    links.push(temp);
}
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

module.exports = app;
