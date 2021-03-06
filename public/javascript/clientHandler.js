/**
 * Created by Maede on 18.04.2015.
 */
(function($) {
    'use strict;'

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
        registerHandlerBarsHelper();
        loadContentFromServer();
		loadLoginStatusFromServer();
        startActivityRefresh();
        $(document).on( "click", ".upvote", upVoteLink);
        $(document).on( "click", ".downvote", downVoteLink);
        $(document).on( "click", ".deletelink", deleteLink);
        $(document).on( "click", "#postNewLink", submitLink);
        $(document).on( "click", "#login", login);
        $(document).on( "click", "#register", register);
        $(document).on( "click", "#logout", logout);

    });

    function registerHandlerBarsHelper(){
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });
    }
    function loadContentFromServer(){
        var templateScript = $("#contentTemplate").html();
        var createNotesHtml_T = Handlebars.compile(templateScript);
        var container = $("#linkContent");
        $.ajax({
            method: "get",
            url: "/links"
        }).done(function (msg) {
            container.html(createNotesHtml_T(msg.data));
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
			loadLoginStatusFromServer();
			loadContentFromServer();
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
			}).fail(function(){
                alert("Login failed.");
            }).done(function (msg) {
                frm.each(function () {
                    this.reset();
                });
				loadLoginStatusFromServer();
				loadContentFromServer();
            });
            event.preventDefault();
        });
    }

    function register(){
        var frm = $('#registerForm');
        var dataValues = {};
        frm.find('input').each(
            function(unusedIndex, child) {
                dataValues[child.id] = child.value;
            }
        );
        frm.unbind("submit");

        frm.submit(function (ev) {
            var outputNotification = "Register was successful, please try to login.";
            console.log("submitting register request..")
            $.ajax({
                method: frm.attr('method'),
                url: frm.attr('action'),
                contentType: "application/json",
                data: dataValues
            }).fail(function () {
                alert("Register failed.");
            }).done(function (msg) {
                frm.hide();
                console.log("Success register process");
                frm.each(function () {
                    alert(outputNotification);
                    this.reset();
                });
            });
            event.preventDefault();
        });
    }

})( jQuery );
