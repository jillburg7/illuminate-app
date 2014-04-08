
// STUDENT lecture.html stuff below
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
	// $.getJSON('../test-data.json', function(data) {
	//   var output = '<ul class="incoming">';
	  var num = 1;
	//   $.each(data, function(key, val) {
	//     // if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
	//       output += '<li id="q'+ num +'">';
	//       output += '<h6>'+ val.name +'</h6>';
	//       output += '<h4><small>'+ val.question +'</small></h4>';
	//       output += '</li>';
	//       num++;
	//     // }
	//   });
	//   output += '</ul>';
	//   $('#panel12').html(output);
	notificationBadge(num);
	// }); //getJSON
	// /* toggles displaying the current set of questions */
	// $("#notification-count").click(function () {
	//   $("#msgs > dd:first > div").toggle();
	//   $("#msgs > dd:first > div").toggleClass("active");
	//   $("#msgs > dd:first").toggleClass("active");
	// }); 
	
	charCounter();
});

/*
* Applies a number count & notification badge to display the current number
* of 'unopened' notifications (once clicked, all current notifications are 
* marked as opened/read)
*/
function notificationBadge(num) {
	$("#notification-count").append('   <span class="label round">' + num + '</span>');
} //notificationBadge

function charCounter() {
	$("#question").keyup(function() {
		var text = $("#question").val();
		var count = 255 - text.length;
		if (count <= 0) {
			//need to stop allowing text to be entered..any keypress won't be 'logged' as a char in textarea
		} else {
			$("#char-counter").html('' + count + " characters left");
		}
	});
	$("#question-m").keyup(function() {
		var text = $("#question-m").val();
		var count = 255 - text.length;
		if (count <= 0) {
			//need to stop allowing text to be entered..any keypress won't be 'logged' as a char in textarea
		} else {
			$("#char-counter-m").html('' + count + " characters left");
		}
	});
}