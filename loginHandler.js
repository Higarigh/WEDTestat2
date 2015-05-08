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

function getLogin(req){

	var user;
	if (typeof (req.session.user_id) == "number") {
		user = {"name":findUserById(req.session.user_id).name,"Message":"Successfully logged in"};
	}else{
		user = {"name":null,"Message":"No user logged in"}
	}
	return user;

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

module.exports = {requireLogin:requireLogin,getLogin:getLogin,logInUser:logInUser,createLogin:createLogin};
