/**
 * Created by Maede on 18.04.2015.
 */
(function($) {
    'use strict;'

    //var jquery = jQuery.noConflict();
    $.ajaxSetup({
        contentType: "application/json",
        processData: false
    });
    $.ajaxPrefilter( function(options, originalOptions, jqXHR) {
        if (options.data) {
            options.data = JSON.stringify(options.data);
        }
    });
    $(document).ready(function(){
        loadContentFromServer();
		loadLoginStatusFromServer();
        startActivityRefresh();
        $(document).on( "click", ".upvote", upVoteLink);
        $(document).on( "click", ".downvote", downVoteLink);
        $(document).on( "click", ".deletelink", deleteLink);
        $(document).on( "click", "#postNewLink", submitLink);
        $(document).on( "click", "#login", login);
        $(document).on( "click", "#logout", logout);

    });

    function loadContentFromServer(){
        var templateScript = $("#contentTemplate").html();
        var createNotesHtml_T = Handlebars.compile(templateScript);
        var container = $("#linkContent");
        $.ajax({
            method: "get",
            url: "/links"
        }).done(function (msg) {
            container.html(createNotesHtml_T(msg));
        });
    }
	function loadLoginStatusFromServer(){

		var templateScript = $("#loginTemplate").html();
		var createNotesHtml_T = Handlebars.compile(templateScript);
		var container = $("#loginContent");
		$.ajax({
			method: "get",
			url: "/login"
		}).done(function (msg) {
			console.log(msg.data);
			container.html(createNotesHtml_T(msg.data));
		});
	}
    function startActivityRefresh() {
        var timer;
        timer = setInterval(function() {
          loadContentFromServer();
        }, 1000)
    };
    function upVoteLink(){
        $.ajax({
            method: "post",
            url: "/links/" + $(this).attr("data-id") + "/up"
        }).done(function (msg) {
            console.log("up voted");
        })
    }
    function downVoteLink(){
        $.ajax({
            method: "post",
            url: "/links/" + $(this).attr("data-id") + "/down"
        }).done(function (msg) {
            console.log("down voted");
        });
    }
    function deleteLink(){
            $.ajax({
                method: "delete",
                url: "/links/" + $(this).attr("data-id")
            }).fail(function () {
                alert("Dude.. you are not the owner of this link. You are not allowed to delete it..")
            }).done(function (msg) {
                console.log("link " + $(this).attr("data-id") + " deleted");
            });
    }
    function postLink(title,url,author){
        var newLink = {
            'title': title,
            'url': url,
            'username': author
        };
        $.ajax({
            method: "put",
            url: "/links",
            contentType: "application/json",
            data: newLink
        });
    }
    function submitLink(){
        var frm = $('#newLink');
        var dataValues = {};
        frm.find('input').each(
            function(unusedIndex, child) {
                dataValues[child.id] = child.value;
            }
        );
        frm.unbind("submit");

        frm.submit(function (ev) {
            $.ajax({
                method: frm.attr('method'),
                url: frm.attr('action'),
                contentType: "application/json",
                data: dataValues
            }).done(function(msg){
                console.log("submitted");
                frm.each(function(){
                    this.reset();
                })
            });
            event.preventDefault();

        })


    }
	function logout(){
		$.ajax({
			method:"post",
			url:"/logout",
			contentType: "application/json"
		}).done(function (msg) {
			console.log("logged out");
			loadLoginStatusFromServer()
		});
	}
    function login(){
        var frm = $('#loginForm');
        var dataValues = {};
        frm.find('input').each(
            function(unusedIndex, child) {
                dataValues[child.id] = child.value;
            }
        );
        frm.unbind("submit");

        frm.submit(function (ev) {
            console.log("submitting login..")
            $.ajax({
                method: frm.attr('method'),
                url: frm.attr('action'),
                contentType: "application/json",
                data: dataValues
			}).done(function (msg) {

                frm.each(function () {
                    this.reset();
                });
				loadLoginStatusFromServer()
            });
            event.preventDefault();

        });
    }


})( jQuery );
