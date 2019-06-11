$(document).ready(function() {
  var numLeft = 140;
    $(".new-tweet form textarea").on("input", function() {
        var text = $.trim($("textarea").val());
        $(".new-tweet form conter")
        console.log((140-text.length));
    });
  });