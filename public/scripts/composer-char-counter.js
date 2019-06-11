$(document).ready(function() {
  var numLeft = 140;
    $(".new-tweet form textarea").on("input", function() {
        var text = $.trim($("textarea").val());
        
        $(".new-tweet form .counter").text(140-text.length);

        if(text.length > 140) {
          $(".new-tweet form .counter").css('color', 'red');
        } else {
          $(".new-tweet form .counter").css('color', 'black');
        }
    });
  });