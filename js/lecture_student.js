// STUDENT lecture.html stuff below

//globals:
var doc;
var currentPage; //holds current page number
var totalPages = -1;

/** 
* 
*/
$(document).ready(function() {
	//specifiy document to load
	doc = PDFJS.getDocument('../server/php/files/Marketing_Slideshow.pdf');
	currentPage = 1;
	prepareDocument(doc, currentPage);

	//var num = 1;
	notificationBadge(1);
	charCounter();
	
	$(".previous-page").click(function() {
		if (currentPage > 1) {
			currentPage = currentPage - 1;
			prepareDocument(doc, currentPage);
			pages();
		}
	});

	$(".next-page").click(function() {
		if (currentPage < totalPages) {
			currentPage = currentPage + 1;
			prepareDocument(doc, currentPage);
			pages();
		}
	});

	//go to beginning of doc
	$(".fi-previous").click(function() {
		if (currentPage !== 1) {
			currentPage = 1;
			prepareDocument(doc, currentPage);
			pages();
		}
	});

	//go to beginning of doc
	$(".fi-next").click(function() {
		if (totalPages !== -1 && currentPage !== totalPages) {
			currentPage = totalPages;
			prepareDocument(doc, currentPage);
			pages();
		}
	});

	/**
	* genious: http://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php
	*/
	// variable to hold request
	var request;
	// bind to the submit event of our form
	$("#create_quiz").submit(function(event){
    // abort any pending request
    if (request) {
    	request.abort();
    }
    // setup some local variables
    var $form = $(this);
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
    // serialize the data in the form
    var serializedData = $form.serialize();

    // let's disable the inputs for the duration of the ajax request
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    request = $.ajax({
    	url: "quiz_creation.php",
    	type: "post",
    	data: serializedData
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
      });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        console.error(
        	"The following error occured: "+
        	textStatus, errorThrown
        	);
      });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // reenable the inputs
        $inputs.prop("disabled", false);
      });

    // prevent default posting of form
    event.preventDefault();
  });

//database call to populate quiz with Q&A data
	$.ajax({
    type: 'POST',
    url: "../php/populate_quiz.php",
    dataType: 'json',
    success: function (q) {
      console.log(q);
      $("#question").html(q[0]);
      $("#ansA").append(q[1]);
      $("#ansB").append(q[2]);
      $("#ansC").append(q[3]);
      $("#ansD").append(q[4]);  
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Details: " + desc + "\nError:" + err);
    }
  });
});

$("#quiz").submit(function(event){
    // prevent default posting of form
    event.preventDefault();
});

/*
* Applies a number count & notification badge to display the current number
* of 'unopened' notifications (once clicked, all current notifications are 
* marked as opened/read)
*/
function notificationBadge(num) {
	$("#notification-count").append('   <span class="label round">' + num + '</span>');
}

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

function prepareDocument(doc, num) {
	//
	// See README for overview
	//
	'use strict';
	//
	// Fetch the PDF document from the URL using promises
	//
	doc.then(function(pdf) {
		// Using promise to fetch the page
		
		pdf.getPage(num).then(function(page) {
			if (totalPages === -1){
				totalPages = pdf.numPages;
				pages();
			}

			var desiredWidth = $("#lecture").width();
			var viewport = page.getViewport(1);
			var scale = desiredWidth / viewport.width;
			var scaledViewport = page.getViewport(scale);
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
		pdf.getPage(currentPage).then(function(page) {

			var desiredWidth = $("#lecture").width();
			var viewport = page.getViewport(1);
			var scale = desiredWidth / viewport.width;
			var scaledViewport = page.getViewport(scale);
			// console.log(scale);
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

function pages() {
	doc.then(function(pdf) {
		var pageCount = $(".page-index");
		$(pageCount).html("Page " + currentPage + " of " + totalPages);
	});
}