/**
 * Created by Maede on 17.04.2015.
 */
var Link = require("./link.js");
var Rating = require('./rating.js');

var links = [];

function _createNewLink(title, url, author){
	var temp
	if(url.match("https?://.+")){
		temp = new Link(links.length, title, author, url);
		links.push(temp);
	}
	return temp;
}

function _getAllLinks(){
    return links;
}

function _getAllLinksSortedByDate(){
	var temp = links.slice();
	return temp.sort(function(a,b) {
		if(a === null){
			return -1;
		}
		if(b===null){
			return 1;
		}
		if(a.createTime < b.createTime){
			return 1;
		}else if(a.createTime > b.createTime) {
			return -1;
		}
		return 0;
	}
	);
}

function _getLink(id){
    return links[id];
}

function _getAuthor(id){
    return links[id].author;
}

function _removeLink(id){
    var entityId = Number(id);
    var data = links[entityId];
	links[entityId] = null;
    return data;
}

function _updateLink(id,newTitle,newUrl,newAuthor){
    var entityId = Number(req.params.id);
    if(links[entityId]){
        links[entityId]._update(newTitle,newUrl, newAuthor);
    }else{
        this.createNewLink(newTitle,newUrl, newAuthor);
    }
    return links[id];
}

function _linkVoteDown(id, user){
    var entityId = Number(id);
    var data = links[entityId];
    if (data){
        data.rating._down(user);
        return true;
    }else{
        return false;
    }
}

function _linkVoteUp(id, user){
    var entityId = Number(id);
    var data = links[entityId];
    if (data){
        data.rating._up(user);
        return true;
    }else{
        return false;
    }
}
module.exports = {getAllLinksSortedByDate:_getAllLinksSortedByDate,createNewLink : _createNewLink, getAllLinks : _getAllLinks, getLink : _getLink, removeLink : _removeLink, getAuthor : _getAuthor, linkVoteDown:_linkVoteDown,linkVoteUp:_linkVoteUp};
