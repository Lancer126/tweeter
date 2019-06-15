//Counts the amount of characters entered
$(document).ready(function() {
  var numLeft = 140;
  $(".new-tweet form textarea").on("input", function() {
    var text = $.trim($("textarea").val());
        
    $(".new-tweet form .counter").text(140-text.length);

    //Sets color of text if condition is met
    if(text.length > 140) {
      $(".new-tweet form .counter").css('color', 'red');
    } else {
      $(".new-tweet form .counter").css('color', 'black');
    }
  });
});