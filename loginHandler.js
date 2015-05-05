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

function getUsers(){
    return Users;
}

function findUserByName(name){
    var usersLength = Users.length;
    var user;
    for (var i = 0; i < usersLength; i++) {
        user = Users[i];
        if(user.name === name){
            console.log("user \"" + name + "\" already exist!");
            return user;
        }
    }
    return null;
}
function findUserById(id){
    var usersLength = Users.length;
    var user;
    for (var i = 0; i < usersLength; i++) {
        user = Users[i];
        if(user.id === id){
            return user;
        }
    }
    return null;
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
function userLoggedIn(){
    if (req.session.user_id === null) {
        return false;
    } else {
        return true;
    }
}
function logInUser(name, password){
    var user = findUserByName(name);
    if(!!user && password == user.password){
        return user.id;
    } else {
        return null;
    }
}
function createLogin(name, password){
    var user = findUserByName(name);
    if(user === null){
        console.log("User \"" + name + "\" not found, create new one");
        user = new User(Users.length,name,password);
        Users.push(user);
    } else {
        console.log("User " + name + " found!")
    }
}
module.exports = {requireLogin:requireLogin,userLoggedIn:userLoggedIn,loginFormHandler:loginFormHandler,getLogin:getLogin,logInUser:logInUser,createLogin:createLogin,getUsers:getUsers};
