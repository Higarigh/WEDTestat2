/**
 * Created by Maede on 17.04.2015.
 */
var Link = require("./link.js");
var Rating = require('./rating.js');

var links = [];

function createNewLink(title, url, author){
	var temp
	if(url.match("https?://.+")){
		temp = new Link(links.length, title, author, url);
		links.push(temp);

	}
	return temp;
}
function getAllLinks(){

    return links;

}
function getLink(id){

    return links[id];

}
function getAuthor(id){

    return links[id].author;

}

function removeLink(id){

    var entityId = Number(id);
    var data = links[entityId];
    links[entityId] = null;
    //links.splice(entityId, 1);
    return data;

}
function updateLink(id,newTitle,newUrl,newAuthor){

    var entityId = Number(req.params.id);
    if(links[entityId]){
        links[entityId]._update(newTitle,newUrl, newAuthor);
    }else{
        this.createNewLink(newTitle,newUrl, newAuthor);
    }
    return links[id];

}
function linkVoteDown(id){

    var entityId = Number(id);
    var data = links[entityId];
    if (data){
        data.rating._down();
        return true;
    }else{
        return false
    }

}
function linkVoteUp(id){

    var entityId = Number(id);
    var data = links[entityId];
    if (data){
        data.rating._up();
        return true;

    }else{
        return false

    }

}
module.exports = {createNewLink : createNewLink, getAllLinks : getAllLinks, getLink : getLink, removeLink : removeLink, getAuthor : getAuthor, linkVoteDown:linkVoteDown,linkVoteUp:linkVoteUp};
