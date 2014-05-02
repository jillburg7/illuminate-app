
// var selected_file = $('#input').get(0).files[0];

// $(document).on('open.fndtn.alert-box', function(event) {
//  console.info('An alert box has been open!');
// });
var x = [];

//focuses input field in modal to create a new course
$(document).on('opened', '[data-reveal]', function () {
	$('#course-name').focus();
	$( "#target" ).submit(function(event) {
			// alert( "Handler for .submit() called." );
			event.preventDefault();
		});
});

/**
* Submission of new course has been initiated.
* Text in input field is stored as the name of course,
*   if empty -> input field gains focus again
* Calls createNewCourse() to generate HTML and push into course array
*/
$("#add-course").click(function() { //anonymous function
	if ($('#course-name').val() != '') {
		if(x.length === 0) {
			//previously had no active courses;
			$("#noCourses").remove(); //now we have 1 so we remove irrelevent content
		}
		var name = $('#course-name').val(); //name in field = course name
    var code = randomString();
		$.ajax({
			type: 'POST',
			url: "course_creation.php",
			data: {'course-name': name, classcode: code},
			success: function(msg) {
				console.log(msg);
				//clear field
				$('#course-name').val('');
				$('#createCourseModal').foundation('reveal', 'close');
				createNewCourse(name, code);
			},
			error: function(xhr, desc, err) {
				console.log(xhr);
				console.log("Details: " + desc + "\nError:" + err);
			}
		});
	} else {
		// Field is empty: give focus back to the input box
		$('#course-name').focus();
	}
});

/**
* genious: http://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php
*/
$(document).ready(function () {
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
        $form.prepend('<div data-alert class="alert-box success radius">This is a success alert with a radius.<a href="#" class="close">&times;</a></div>');
        // log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        $form.each(function(){
          this.reset();
        });
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

	$.ajax({
    type: 'POST',
    url: "../php/show_courses.php",
    dataType: 'json',
    success: function (msg) {
      if (msg !== null) {
        for (var i = 0; i <msg.length; i+=2) { 
          createNewCourse(msg[i], msg[i+1]);
        }        
        $("#noCourses").remove(); 
        console.log(msg);
      }
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Details: " + desc + "\nError:" + err);
    }
  });

  // $("#clear_form").click(function() { 
  // 	$form.reset(); 
  // });

});

/* 
* Instructor Course Creation (on dashboard.html)
* Pushes new course into an array of created courses,
*   Max capicity limit of 5 courses
*/
var createNewCourse = function(cname, code) {
	if (x.length < 5) {
		// index of course panel & contents
		var id = "course" + x.length;

		var panel = '<div class="row panel" id="' + id + '">' + '<a href="lecture.html">';
		panel += '<div class="small-12 medium-6 large-6 columns"><h5>Course Name: ' + cname + '</h5>';
		panel += '<h6 >Course ID: ' + code + '</h6></div>';
		panel += '</a>' + '<div class="small-12 medium-6 large-6 columns"><h5>Choose a file to upload:</h5>';
		panel += '<input id="fileupload" type="file" name="files[]" multiple>';
		panel += '</div>' + '<div class="small-12 medium-6 large-6 columns">' + '<div id="files" class="files"></div>' + '</div>' + '</div>';

		if(x.length === 0) {
			$("#panel2-1").append(panel);
		} else {
			$("#panel2-1 > div:first-child").before(panel);
		}
		var course_id = '#' + id; 
		x.push(course_id);
	}
	else {
		console.info("Cannot add anymore courses at this time!");
	}
	if(x.length === 1) {
		fileChooser();
	}
}

/* 
* Random string generator
* returns: string containing 6 chars of random capital letters and digits 0-9
*/
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

/**
* Code Credit for file uploader: jQuery File Uploader
* https://github.com/blueimp/jQuery-File-Upload
*/
function fileChooser() {
	/*jslint unparam: true, regexp: true */
	/*global window, $ */
	$(function () {
		'use strict';
		// Change this to the location of your server-side upload handler:
		var url = '../server/php/',
		uploadButton = $('<button/>')
		.addClass("nice-button")
		.text('Upload file')
		.on('click', function () {
			var $this = $(this),
			data = $this.data();
			$this
			.off('click')
			.on('click', function () {
				$this.remove();
				data.abort();
			});
			data.submit().always(function () {
				$this.remove();
			});
		});
		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			autoUpload: false,
				//acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 5000000, // 5 MB
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator.userAgent),
			previewMaxWidth: 100,
			previewMaxHeight: 100,
			previewCrop: true
		}).on('fileuploadadd', function (e, data) {
			data.context = $('<div/>').appendTo('#files');
			$.each(data.files, function (index, file) {
				var node = $('<p/>')
				.append($('<span/>').text(file.name));
				if (!index) {
					node
					.append('<br>')
					.append(uploadButton.clone(true).data(data));
				}
				node.appendTo(data.context);
			});
		}).on('fileuploadprocessalways', function (e, data) {
			var index = data.index,
			file = data.files[index],
			node = $(data.context.children()[index]);
			if (file.preview) {
				node
				.prepend('<br>')
				.prepend(file.preview);
			}
			if (file.error) {
				node
				.append('<br>')
				.append($('<span class="text-danger"/>').text(file.error));
			}
			if (index + 1 === data.files.length) {
				data.context.find('button')
				.text('Upload')
				.prop('disabled', !!data.files.error);
			}
		}).on('fileuploadprogressall', function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css(
				'width',
				progress + '%'
				);
		}).on('fileuploaddone', function (e, data) {
			$.each(data.result.files, function (index, file) {
				if (file.url) {
					var link = $('<a>')
					.attr('target', '_blank')
					.prop('href', file.url);
					$(data.context.children()[index])
					.wrap(link);
				} else if (file.error) {
					var error = $('<span class="text-danger"/>').text(file.error);
					$(data.context.children()[index])
					.append('<br>')
					.append(error);
				}
			});
		}).on('fileuploadfail', function (e, data) {
			$.each(data.files, function (index, file) {
				var error = $('<span class="text-danger"/>').text('File upload failed.');
				$(data.context.children()[index])
				.append('<br>')
				.append(error);
			});
		}).prop('disabled', !$.support.fileInput)
		.parent().addClass($.support.fileInput ? undefined : 'disabled');
	});
}
