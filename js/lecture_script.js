
//lecture.html stuff below
//Use data generator to generate student names and questions they ask and then export as 
//JSON -> which will then be used in the JavaScript regular expression matcher/aggregator


/** 
* The Idea:
* -> Query db for all students questions (@ some specified rate...!)
* -> Find common words.. [eg. would need to track words that occur twice or more]
* -> Questions that contain the word(s) with the highest occurance are group together
* -> [Lastly, clicking into view -> modify status options (radios)]
*/
$(document).ready(function() {
  $.getJSON('../test-data.json', function(data) {
    var output = '<ul class="incoming">';
    $.each(data, function(key, val) {
      // if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
        output += '<li>';
        output += '<h6>'+ val.name +'</h6>';
        output += '<h4><small>'+ val.question +'</small></h4>';
        output += '</li>';
      // }
    });
    output += '</ul>';
    // $('#panel22').html(output);
    $('#panel12').html(output);
  }); //getJSON
});
