/**
 * Created by Maede on 18.04.2015.
 */
function printTest(){
    alert("Hey Jade");
}

function postLink(title, url, author){
    var jquery = jQuery.noConflict();
    jquery(document).ready(function(){
        var newLink = {
            'title': title,
            'url': url,
            'author': author
        };
        jquery.ajax({
            method: "PUT",
            url : "/links",
            dataType: 'json',
            data: newLink
        })
    })


}