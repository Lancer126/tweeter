//Checks if the tweet content is valid
function checkValid(input) {
  //If content is empty
  if(!input){
    $("#empty").show(100);
    $("#long").hide(100);
    return false;
  }

  //If the character number is bigger than 140
  if(input.length > 140) {
    $("#long").show(100);
    $("#empty").hide(100);
    return false;
  }

  //If content respects conditions
  $("#empty").hide(100);
  $("#long").hide(100);
  return true;
}

//Requests the tweets from the database
const request = options => {
  $.ajax(options)
  .done(tweets => {
    renderTweets(tweets);
  })
  .fail(error => {})
}

function renderTweets(data) {
  //Takes out the tweets shown on the page
  $(".tweet-container").empty();

  //Creates the tweet elements and adds them to the page
  for (let i = 0; i < data.length; i++) {
    const tweet = createTweetElement(data[i]);
    $(".tweet-container").prepend(tweet);

    //Shows the like, re-tweet and flag buttons when hovering over the tweet
    tweet.mouseover(function() {
      tweet.find("footer img").css('opacity', '0.9');
    });

    //Hides the buttons when not hovering over the tweet
    tweet.mouseout(function() {
      tweet.find("footer img").css('opacity', '0');
    });
  }
}

function createTweetElement(tweet) {
  //Creates the header of the tweet
  let $user = $("<header>").addClass("user-info");
  let $avatar = $("<img>").attr("src", tweet.user.avatars.small);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<span>").text(tweet.user.handle);
  $user.append($avatar).append($name).append($handle);

  //Creates the tweet content of the tweet
  let $content = $("<p>").text(tweet.content.text);

  //Creates the footer of the tweet
  var date = new Date(tweet.created_at).toISOString().slice(0, 10);
  let $date = $("<h6>").text(date);
  let $footer = $("<footer>").addClass("footer");
  let $like = $("<img>").attr("src", "/images/heart.png").addClass("like");
  let $share = $("<img>").attr("src", "/images/retweet.png").addClass("share");
  let $flag = $("<img>").attr("src", "/images/flag.png").addClass("flag");
  $footer.append($date).append($like).append($share).append($flag);

  //Creates the tweet
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append($user).append($content).append($footer);

  return $tweet;
}

//Loads the tweets when the page has loaded
$(document).ready(function(){
  loadTweets();
})

//What happens when we click the Tweet button
$(function() {
  $( ".new-tweet form" ).submit(function( event ) {
    //Doesn't change page
    event.preventDefault();

    //Checks if tweet content is valid
    var validity = checkValid($(this).serialize().slice(5));

    //If valid, adds tweet to database
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

//Compose button behavior on click
$(function() {
  $( "#nav-bar .compose" ).click(function() {
    $(".new-tweet").slideToggle(150);               //The tweet area slides into view
    $("textarea").select();                         //Allows to write without click the text area
    $('html, body').animate({scrollTop:0}, '300');  //Scrolls to the top
  });
});