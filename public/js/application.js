function bindFormSubmit() {
  $('form#tweetForm').on('submit', function(e) {
    e.preventDefault();

    var tweetData = $('#tweetForm').serialize();
    
    $('div.response').empty();
    $("#tweetForm :input").attr("disabled", true);
    $('div.tweet').fadeOut(400);
    $("<i class='icon-spinner icon-spin icon-4x'></i>").appendTo('div.response');
    
    $.post('/tweet', tweetData)
    .done(function(){
      interval = setInterval(function(job){
        $.get('/tweet/' + job, function(response, status){
          if (status === "success") {
            tweetFeedback('Tweet Succeeded!');
          }
        });  
      } ,1000); 
    })
    .fail(function(){
      tweetFeedback('Tweet Failed!');
    });
  });
}

function tweetFeedback(messsage){
  clearInterval(interval);
  $('i.icon-spinner').fadeOut();
  $('<h1></h1>').fadeIn().html(messsage).appendTo('div.response');
  $("form#tweetForm :input").attr("disabled", false);
  $('#tweetForm').find("input[type=text], textarea").val("");
  $('div.tweet').delay(2000).fadeIn(400);
  $('h1').delay(1500).fadeOut();
}

$(function() { 
  bindFormSubmit();
});
