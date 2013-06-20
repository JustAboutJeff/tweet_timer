$(function() {

  $('form#tweetForm').on('submit', function(e) {
    e.preventDefault();

    var tweetData = $('#tweetForm').serialize();
    console.log(tweetData);
    
    $('div.response').empty();
    $("#tweetForm :input").attr("disabled", true);
    $("<img id='wait' src='wait.gif' alt='waiting'>").appendTo('div.response');

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
