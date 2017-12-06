function on_data(data) {
    $('#results').empty();
    var docs = data.response.docs;
    $.each(docs, function(i, item) {
        $('#results').prepend($('<div>' + item.name + '</div>'));
    });

    var total = 'Found ' + docs.length + ' results';
    $('#results').prepend('<div>' + total + '</div>');
}

var sites = {
  slave03: {
    url: 'http://152.46.17.34:8983/solr/hashtagtrend/',
    id: "slave03status"
  },
  slave04: {
    url: 'http://152.46.18.227:8983/solr/hashtagtrend/',
    id: "slave04status"
  }
};

function checkStatusUsingAJAX(site) {
  $.ajax(site.url).done(function() {
    document.getElementById(site.id).innerHTML = "Up"
  }).fail(function() {
    document.getElementById(site.id).innerHTML = "Down"
  });
};


function on_search() {
    $('#results').empty();
    var query = $('#query').val();
    //console.log(query);
    if (query.length == 0) {
        return;
    }

    var url='http://152.46.18.227:8983/solr/hashtagtrend/select?df=text&fl=hashtag&group.field=trend&group.main=true&group=true&q='+query+'&rows=10&wt=json';
    var url_fault='http://152.46.17.34:8983/solr/hashtagtrend/select?df=text&fl=hashtag&group.field=trend&group.main=true&group=true&q='+query+'&rows=10&wt=json';
    var url_ngram='http://152.46.18.227:8983/solr/hashtagtrend/select?df=hashtag_ngram&q='+query+'&rows=10&sort=trend%20desc&wt=json';
    var url_text='http://152.46.18.227:8983/solr/hashtagtrend/select?df=text&q='+query+'&rows=10&sort=trend%20desc&wt=json';
    
    var mySet = new Set();
    var mySet_engram = new Set();
    var mySet_text = new Set();

    $.getJSON(url, function(data){
        if(data.response.docs.length > 0)
        {
            for (var i=0; i<data.response.docs.length; i++) {
                var doc = data.response.docs[i];
                $("#results").append(doc.hashtag + "<br />");
            }  
        }
        else
        {
            $.getJSON(url_text, function(data_text){
                if(data_text.response.docs.length > 0)
                {
                    for (var i=0; i<data_text.response.docs.length; i++) {
                        var doc_text = data_text.response.docs[i];
                        //console.log(doc_new.hashtag);
                        mySet_text.add(doc_text.hashtag);
                        //$("#results").append(doc_new.hashtag + "<br />");
                    }
                    for (let item of mySet_text){
                        console.log(item);
                        $("#results").append(item + "<br />");
                    }      
                }
                else
                {
                    $.getJSON(url_ngram, function(data_engram){
                        for (var i=0; i<data_engram.response.docs.length; i++) {
                        var doc_engram = data_engram.response.docs[i];
                        mySet_engram.add(doc_engram.hashtag);
                        }
                        for (let item of mySet_engram){
                            console.log(item);
                            $("#results").append(item + "<br />");
                        }
                    });    
                }
            });
            
        }
    });
    /*.success(function() { console.log("success 2"); })
    .error(function() { 
        //alert("error occurred ");
        $.getJSON(url_fault, function(data_fault){
            for (var i=0; i<data_fault.response.docs.length; i++) {
                var doc_fault = data_fault.response.docs[i];
                $("#results").append(doc_fault.hashtag + "<br />");
            }
        });
    })
    .complete(function() { console.log("Done"); });*/
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