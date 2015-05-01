/**
 * Created by Maede on 17.04.2015.
 */
var User = require("./user.js");

var Users = [];

function requireLogin(req, res, next){
    if(typeof(req.session.user_id) == "number"){
        next();
    }else{
        res.send(401,'not authorized');
    }
}

function findUserByName(name){
    for(user in Users){
        if(user.name == name){
            return user;
        }
    }
}
function findUserById(id){
    for(user in Users){
        if(user.id == id){
            return user;
        }
    }
}
function checkPw(userObj, pw){
    return (userObj.pwHash == "notNeeded");
}
function loginFormHandler(req, res, next){
    var user = findUserByName(req.body.username);
    if(user && checkPw(user,req.body.password)){
        req.session.user_id = user.id;
        res.redirect("/linkit")
    }
    else{
        res.redirect("www.google.ch");
    }
}
function getLogin(id){
    return findUserById(id);
}
function logInUser(name,password){
    var user = findUserByName(name);
    if(!!user && password == user.password){
        return user.id;
    }
}
function createLogin(name,password){
    var user = findUserByName(name);
    if(!!user){
        user = new User(Users.size(),name,password);
        Users.push(user);
    }
}
function logOutUser(name){
    req.session.user_id = null;
}
module.exports = {loginFormHandler : loginFormHandler, getLogin:getLogin,logInUser:logInUser,logOutUser:logOutUser,createLogin:createLogin};
