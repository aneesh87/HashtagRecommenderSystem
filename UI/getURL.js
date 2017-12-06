function on_data(data) {
    $('#results').empty();
    var docs = data.response.docs;
    $.each(docs, function(i, item) {
        $('#results').prepend($('<div>' + item.name + '</div>'));
    });

    var total = 'Found ' + docs.length + ' results';
    $('#results').prepend('<div>' + total + '</div>');
}

function on_search() {
    var query = $('#query').val();
    if (query.length == 0) {
        return;
    }

    var url='http://xxxx.xxx.xxxx.xxx/xxx_xxx/core0/selectcore0/select/?q='+query+'&version=2.2&start=0&rows=50&indent=on&wt=json&callback=?&json.wrf=on_data';
    $.getJSON(url);
}

function on_ready() {
    $('#search').click(on_search);
    /* Hook enter to search */
    $('body').keypress(function(e) {
        if (e.keyCode == '13') {
            on_search();
        }
    });
}

$(document).ready(on_ready);