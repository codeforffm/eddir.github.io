var schools = (function () {
    var json = null;
    $.ajax({
        'async'   : false,
        'global'  : false,
        'url'     : "src/data/frankfurt-schools.json",
        'dataType': "json",
        'success' : function (data) {
            json = data;
        }
    });
    return json;
})();

var nurseries = (function () {
    var json = null;
    $.ajax({
        'async'   : false,
        'global'  : false,
        'url'     : "src/data/frankfurt-nurseries.json",
        'dataType': "json",
        'success' : function (data) {
            json = data;
        }
    });
    return json;
})();
