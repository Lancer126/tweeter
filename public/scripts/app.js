function checkValid(input) {
  if(!input){
    $("#empty").show(100);
    $("#long").hide(100);
    return false;
  }

  if(input.length > 140) {
    $("#long").show(100);
    $("#empty").hide(100);
    return false;
  }

  $("#empty").hide(100);
  $("#long").hide(100);
  return true;
}

const request = options => {
    $.ajax(options)
    .done(tweets => {
      renderTweets(tweets);
    })
    .fail(error => {})
}
  
function renderTweets(data) {
  $(".tweet-container").empty();
  for (let i = 0; i < data.length; i++) {
    const tweet = createTweetElement(data[i]);
    $(".tweet-container").prepend(tweet);

    tweet.mouseover(function() {
      tweet.find("footer img").css('opacity', '0.9');
    });
    tweet.mouseout(function() {
      tweet.find("footer img").css('opacity', '0');
    });
  }
}
  
function createTweetElement(tweet) {
  let $user = $("<header>").addClass("user-info");
  let $avatar = $("<img>").attr("src", tweet.user.avatars.small);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<span>").text(tweet.user.handle);
  $user.append($avatar).append($name).append($handle);

  let $content = $("<p>").text(tweet.content.text);

  var date = new Date(tweet.created_at).toISOString().slice(0, 10);
  let $footer = $("<footer>").addClass("footer");
  let $date = $("<h6>").text(date);
  let $like = $("<img>").attr("src", "/images/heart.png").addClass("like");
  let $comment = $("<img>").attr("src", "/images/comment.png").addClass("comment");
  let $flag = $("<img>").attr("src", "/images/flag.png").addClass("flag");

  $footer.append($date).prepend($like).prepend($comment).prepend($flag);

  let $tweet = $('<article>').addClass('tweet');
  $tweet.append($user).append($content).append($footer);

  return $tweet;
}

$(document).ready(function(){
  loadTweets();
})
  
$(function() {
  $( ".new-tweet form" ).submit(function( event ) {
    event.preventDefault();
    var validity = checkValid($(this).serialize().slice(5));

    if(validity) {
      $.ajax({ method: 'POST', url: "/tweets", data: $(this).serialize() })
      .done(function () {
        loadTweets();
        $( "textarea" ).val("");
        $( ".counter" ).text(140);
      });
    };
  });
});

function loadTweets() {
    const options = {
      method: "GET",
      url: "/tweets"
    };

    request(options, renderTweets);
}

$(function() {
  $( "#nav-bar .compose" ).click(function() {
    $(".new-tweet").slideToggle(150);
    $("textarea").select();
    $('html, body').animate({scrollTop:0}, '300');
  });
});