/**
 * Created by Maede on 17.04.2015.
 */
var User = require("./user.js");

var Users = [];

function _requireLogin(req, res, next){
    if(typeof(req.session.user_id) == "number"){
        next();
    }else{
        res.send(401,'not authorized');
    }
}

function _findUserByName(name){
    var usersLength = Users.length;
    var user;
    for (var i = 0; i < usersLength; i++) {
        user = Users[i];
        if(user.name === name){
            return user;
        }
    }
    return null;
}

function _findUserById(id){
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

function _getLogin(req){
	var user;
	if (typeof (req.session.user_id) == "number") {
		user = {"name":_findUserById(req.session.user_id).name,"Message":"Successfully logged in"};
	}else{
		user = {"name":null,"Message":"No user logged in"}
	}
	return user;
}

function _logInUser(name, password){
    var user = _findUserByName(name);
    if(!!user && password == user.password){
        return user.id;
    } else {
        //TODO Return failure "Userlogin incorrect"
        return null;
    }
}

function _createLogin(name, password){
    var user = _findUserByName(name);
    if(user === null){
        user = new User(Users.length,name,password);
        Users.push(user);
        return true;
    } else {
        //TODO Return failure "User found"
        return false;
    }
}

module.exports = {requireLogin:_requireLogin,getLogin:_getLogin,logInUser:_logInUser,createLogin:_createLogin};
