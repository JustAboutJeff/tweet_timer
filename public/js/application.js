$(function() {

  $('form#tweetForm').on('submit', function(e) {
    e.preventDefault();

    var tweetData = $('#tweetForm').serialize();
    
    $('div.response').empty();
    $("#tweetForm :input").attr("disabled", true);
    $("<p><i id='wait' class='icon-spinner icon-spin icon4x'></i></p>").appendTo('div.response');
    
    $.post('/tweet', tweetData)
    .done(function(){
      interval = setInterval(function(job){
        $.get('/tweet/' + job, function(response, status){
          if (status === "success") {
            clearInterval(interval);
            $('#wait').remove();
            $('<h2></h2>').html('Success!').appendTo('div.response');
            $("form#tweetForm :input").attr("disabled", false);
          }
        });  
      } ,1000); 
    })
    .fail(function(){
      clearInterval(interval);
      $('#wait').remove();
      $('<h2></h2>').html('Failure!').appendTo('div.response');
      $("form#tweetForm :input").attr("disabled", false);      
    });
  });
});
