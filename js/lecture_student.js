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
	doc = PDFJS.getDocument('../files/Marketing_Slideshow.pdf');
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