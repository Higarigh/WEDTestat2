/**
 * Created by Maede on 18.04.2015.
 */
(function( $ ) {
    $.ajaxSetup({ cache: false });

    $(function(){
        var templateScript = $("#contentTemplate").html();
        var createNotesHtml_T = Handlebars.compile(templateScript);
        var container = $("#linkContent");
        updateContent();
        function updateContent() {
            $.ajax({
                method: "get",
                url: "/links"
            }).done(function (msg) {
                container.html(createNotesHtml_T(msg));
            });
        };
        setInterval(function(){ updateContent(); }, 1000);
    });
})( jQuery );

function upVote(id) {
    var jquery = jQuery.noConflict();
    jquery.ajaxSetup({
        contentType: "application/json",
        processData: false
    });
    jquery.ajaxPrefilter( function(options, originalOptions, jqXHR) {
        if (options.data) {
            options.data = JSON.stringify(options.data);
        }
    });
    jquery(document).ready(function(){
        jquery.ajax({
            method: "post",
            url: "/links/" + id + "/up"
        }).done(function (msg) {
            console.log("up voted");
        });
    });
};

function downVote(id) {
    var jquery = jQuery.noConflict();
    jquery.ajaxSetup({
        contentType: "application/json",
        processData: false
    });
    jquery.ajaxPrefilter( function(options, originalOptions, jqXHR) {
        if (options.data) {
            options.data = JSON.stringify(options.data);
        }
    });
    jquery(document).ready(function(){
        jquery.ajax({
            method: "post",
            url: "/links/" + id + "/down"
        }).done(function (msg) {
            console.log("down voted");
        });
    });
};

function deleteLink(id) {
    var jquery = jQuery.noConflict();
    jquery.ajaxSetup({
        contentType: "application/json",
        processData: false
    });
    jquery.ajaxPrefilter( function(options, originalOptions, jqXHR) {
        if (options.data) {
            options.data = JSON.stringify(options.data);
        }
    });
    jquery(document).ready(function(){
        jquery.ajax({
            method: "delete",
            url: "/links/" + id
        }).done(function (msg) {
            console.log("link " + id + " deleted");
        });
    });
};

function postLink(title, url, author){

    var jquery = jQuery.noConflict();
    jquery.ajaxSetup({
        contentType: "application/json",
        processData: false
    });
    jquery.ajaxPrefilter( function(options, originalOptions, jqXHR) {
        if (options.data) {
            options.data = JSON.stringify(options.data);
        }
    });
    jquery(document).ready(function(){
        var newLink = {
            'title': title,
            'url': url,
            'username': author
        };
        jquery.ajax({
            method: "put",
            url: "/links",
            contentType: "application/json",
            data: newLink
        });
    })
}