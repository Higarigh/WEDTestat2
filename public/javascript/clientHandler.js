/**
 * Created by Maede on 18.04.2015.
 */
function printTest(){
    alert("Hey Jade");
}

function postLink(title, url, author){
    var jquery = jQuery.noConflict();
    jquery(document).ready(function(){
        jquery.ajax({
            url : 'http://localhost:3000/links',
            type: 'PUT',
            data: 'Title=' + title + "&url=" + url + "&author=" + author
        })
    })


}