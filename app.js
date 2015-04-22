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
var handler = require("./linkHandler.js");

//Sample Data
createSampleData();


app.use(bodyParser.json());

app.get('/links', function(req, res, next) {
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
    renderData(res,handler.getAllLinks());

});

app.get('/links/:id', function(req, res, next) {

    renderData(res,handler.getLink(req.params.id));

});

app.post('/links/:id/up', function(req, res, next) {

    if(handler.linkVoteUp(req.params.id)){
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }

});

app.post('/links/:id/down', function(req, res, next) {

    if(handler.linkVoteDown(req.params.id)){
        res.redirect("/links/" + req.params.id);
    }else{
        res.redirect("/links");
    }

});
app.post('/links', function(req, res, next) {

    handler.createNewLink(req.body.title, req.body.url,req.body.username);
    res.redirect("/links");

});
app.post('/links/:id', function(req, res, next) {

    if(handler.updateLink(req.param.id)){
        res.redirect("/links/" + req.param.id);
    } else{
        res.redirect("/links");
    }

});

app.put('/links', function(req, res, next) {

    var temp = handler.createNewLink(req.body.title,req.body.url,req.body.username);

    renderData(res,temp);

});


app.delete('/links/:id', function(req, res, next) {

    var temp = handler.removeLink(req.params.id);

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

    handler.createNewLink("Google","www.google.com","Generator");

    handler.createNewLink("Facebook","www.facebook.com","Generator");

    handler.createNewLink("HSR","www.hsr.ch","Generator");

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
