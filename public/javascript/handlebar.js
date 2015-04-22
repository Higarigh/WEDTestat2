/**
 * Created by phil on 22.04.15.
 */
$.get('/', parameters, function(data){
    if (data instanceof Array) {
        $results.html(dataTemplate({resultsArray:data}));
    } else {
        $results.html(data);
    };
});
$(function(){
    var source = $("#linkView").html();
    var dataTemplate = Handlebars.compile(source);
});