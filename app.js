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

var links = [ ];

app.get('/links', function(req, res) {
    renderData(res, links);
});

app.get('/links/:id', function(req, res) {
    renderData(res, links[Number(req.params.id)]);
});

app.post('/links/:id/up', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    data.rating._up();


});

app.post('/links/:id/down', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    console.log("blub");
    console.log(entityId);

    data.rating._down();
});

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

app.put('/links/:id', function(req, res) {
    readData(req, function(data) {
        if (data) {
            var entityId = Number(req.params.id);
            if (links[entityId]) {
                links[entityId] = data;
                data.id = entityId;
            }
        }
        renderData(res, data);
    });
});

app.delete('/links/:id', function(req, res) {
    var entityId = Number(req.params.id);
    var data = links[entityId];
    links.splice(entityId, 1);
    renderData(res, entityId);
});

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

function renderData(res, data) {
    res.writeHead(200, {
        "Content-Type" : "application/json"
    });

    res.end(JSON.stringify({
        data : data || null
    }));
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
