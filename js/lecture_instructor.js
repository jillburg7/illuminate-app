
//Instructor lecture.html stuff below
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
		var num = 0;
		var re = new RegExp("fly");
		$.each(data, function(key, val) {
			// if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {}
			if (val.question.search(re) != -1) {
				output += '<li id="q'+ num +'">';
				output += '<h6>'+ val.name +'</h6>';
				output += '<h4><small>'+ val.question +'</small></h4>';
				output += '<div class="statuschanger"><input type="radio" name="status'+ num +'" value="default" id="default'+ num +'" checked /><label for="default'+ num +'">Not answered</label><br/><input type="radio" name="status'+ num +'" value="save" id="save'+ num +'"/><label for="save'+ num +'">Save for later</label><br/><input type="radio" name="status'+ num +'" value="answered" id="answered'+ num +'"/><label for="answered'+ num +'">Answered</label></div>' + '</li>';
				num++;
			}
		});
		output += '</ul>';
		$('#panel12').html(output);
		notificationBadge(num);
	}); //getJSON
	/* toggles displaying the current set of questions */
	$("#notification-count").click(function () {
		// if()
		$("#msgs > dd:first > div").toggle();
		$("#msgs > dd:first > div").toggleClass("active");
		$("#msgs > dd:first").toggleClass("active");
		$(".incoming > li").children(".statuschanger").removeClass("active");
		status();
	});
});

/*
* Applies a number count & notification badge to display the current number
* of 'unopened' notifications (once clicked, all current notifications are 
* marked as opened/read)
*/
function notificationBadge(num) {
	$("#notification-count").append('   <span class="label round">' + num + '</span>');
} //notificationBadge

function divvy() {
	var re = new RegExp("weather");
}

function status() {
	var questions = $(".incoming > li h6, .incoming > li h4");
	questions.click(function () {
		if (!$(this).siblings(".statuschanger").hasClass("active"))
			$(".incoming > li").children(".statuschanger").removeClass("active");
		$(this).siblings(".statuschanger").toggleClass("active");
	});
}
