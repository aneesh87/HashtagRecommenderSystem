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
    $('#results').empty();
    var query = $('#query').val();
    //console.log(query);
    if (query.length == 0) {
        return;
    }

    //var url='http://152.46.20.9:8983/solr/hashtagtrend/select?df=text&q=anime&wt=json';
    //http://152.46.20.9:8983/solr/hashtagtrend/select?df=hashtag&q=anime&wt=json
    var url='http://152.46.20.9:8983/solr/hashtagtrend/select?df=hashtag&q='+query+'&wt=json';
    var url_new='http://152.46.20.9:8983/solr/hashtagtrend/select?df=text&q='+query+'&wt=json';
    
    var mySet = new Set();
    //mySet.add(1);

    //console.log("mySet"+mySet.size);

    $.getJSON(url, function(data){
        if(data.response.docs.length > 0)
        {
            for (var i=0; i<data.response.docs.length; i++) {
                var doc = data.response.docs[i];
                console.log(doc.hashtag);
                mySet.add(doc.hashtag);
                //console.log(mySet.size);
                //printSet(mySet);
                $("#results").append(doc.hashtag + "<br />");
            }   
        }
        else
        {
            $.getJSON(url_new, function(data_new){
                for (var i=0; i<data_new.response.docs.length; i++) {
                    var doc_new = data_new.response.docs[i];
                    console.log(doc_new.hashtag);
                    //mySet_new.add(doc_new.hashtag);
                    $("#results").append(doc_new.hashtag + "<br />");
                }
            });
        }
    });
    //console.log("mySet"+mySet.size);
    
    /*if(mySet.size > 0)
    {
        for (let item of mySet){
            console.log(item);
            $("#results").append(item + "<br />");
        }
    }
    else
    {
       for (let item of mySet_new){
            console.log(item);
            $("#results").append(item + "<br />");
        } 
    }*/
    /*$.getJSON(url, function(data){
        //console.log(data.response.docs);
        for (var i=0; i<data.response.docs.length; i++) {
            var doc = data.response.docs[i];
            console.log(doc.hashtag);
            $("#results").append(doc.hashtag + "<br />");
        }
        // $.each(data.response.docs, function(i, field){
        //     $("div").append(field + " ");
        // });
    });*/
}

function printSet(mySet)
{
    for (let item of mySet){
       console.log(item);
       $("#results").append(item + "<br />");
    }   
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