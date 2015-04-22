/**
 * Created by Maede on 18.04.2015.
 */
function printTest(){
    alert("Hey Jade");
}

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