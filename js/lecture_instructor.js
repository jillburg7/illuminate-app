
//Instructor lecture.html stuff below
//Use data generator to generate student names and questions they ask and then export as 
//JSON -> which will then be used in the JavaScript regular expression matcher/aggregator
var doc;// = PDFJS.getDocument('../files/ln025.pdf');
/** 
* The Idea:
* -> Query db for all students questions (@ some specified rate...!)
* -> Find common words.. [eg. would need to track words that occur twice or more]
* -> Questions that contain the word(s) with the highest occurance are group together
* -> [Lastly, clicking into view -> modify status options (radios)]
*/
$(document).ready(function() {
	doc = PDFJS.getDocument('../files/ln025.pdf');
	prepareDocument(doc);

	$.getJSON('../test-data.json', function(data) {
		var output = '<ul class="incoming">';
		var num = 0;

		// var searchString = "fly";
		var searchString = "fly";
		var re = new RegExp(searchString);

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
		$("#msgs > dd:first > a").html("Keyword:  " + searchString);
		notificationBadge(num);
	}); //getJSON

	/* toggles displaying the current set of questions */
	$("#notification-count").click(function () {
		// $("#slider").toggle();
		//$("#lecture").toggleClass("small-12 medium-9 large-9 columns");

		if($("#lecture").hasClass("medium-12 large-12")) {
			$("#lecture").removeClass("medium-12 large-12").addClass("medium-9 large-9");
			$("#slider").removeClass('animated slideOutRight').addClass('animated slideInRight');
			calculateScale();
			$("#slider").show();
		}
		else if ($("#lecture").hasClass("medium-9 large-9")) {
			$("#lecture").removeClass("medium-9 large-9").addClass("medium-12 large-12");
			$("#slider").removeClass('animated slideInRight');
			calculateScale();
			$("#slider").css("display", "none");
		}
		$("#slider").toggleClass("small-12 medium-3 large-3 columns question-panel");


		$("#msgs > dd:first > div").toggle();
		$("#msgs > dd:first > div").toggleClass("active");
		$("#msgs > dd:first").toggleClass("active");
		$(".incoming > li").children(".statuschanger").removeClass("active");
		status();
	});
	$("#msgs > dd:first > a").click(function () {
		$("#msgs > dd:first > div").toggle();
		$("#msgs > dd:first > div").toggleClass("active");
		$("#msgs > dd:first").toggleClass("active");
		$(".incoming > li").children(".statuschanger").removeClass("active");
		status();
	});

	$("#save").click(function() { pages(); });
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
		// $(this).siblings(".statuschanger").slideToggle();
	});
}

function prepareDocument(doc) {
	//
	// See README for overview
	//
	'use strict';
	//
	// Fetch the PDF document from the URL using promises
	//
	doc.then(function(pdf) {
		// Using promise to fetch the page
		pdf.getPage(1).then(function(page) {
			// var scale = 1.2;//1.5;
			// var viewport = page.getViewport(scale);
			// console.log(viewport);

			var desiredWidth = $("#lecture").width();
			var viewport = page.getViewport(1);
			var scale = desiredWidth / viewport.width;
			var scaledViewport = page.getViewport(scale);
			console.log(scale);
			// console.log(scaledViewport);
			viewport = scaledViewport;

			//
			// Prepare canvas using PDF page dimensions
			//
			var canvas = document.getElementById('the-canvas');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			//
			// Render PDF page into canvas context
			//
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext);
		});
	});
}

function calculateScale() {
	doc.then(function(pdf) {
		// Using promise to fetch the page
		pdf.getPage(1).then(function(page) {

			var desiredWidth = $("#lecture").width();
			var viewport = page.getViewport(1);
			var scale = desiredWidth / viewport.width;
			var scaledViewport = page.getViewport(scale);
			console.log(scale);
			console.log(scaledViewport);
			viewport = scaledViewport;

			//
			// Prepare canvas using PDF page dimensions
			//
			var canvas = document.getElementById('the-canvas');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			//
			// Render PDF page into canvas context
			//
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext);
		});
	});
}


function pages() {
	doc.then(function(pdf) {
		console.log(pdf.numPages);
	});
}