
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
		//clear field
		$('#course-name').val('');
		$('#createCourseModal').foundation('reveal', 'close');
		createNewCourse(name);
	} else {
		// Field is empty: give focus back to the input box
		$('#course-name').focus();
	}
});

/* 
* Instructor Course Creation (on dashboard.html)
* Pushes new course into an array of created courses,
*   Max capicity limit of 5 courses
*/
var createNewCourse = function(cname) {
	if (x.length < 5) {
		// index of course panel & contents
		var id = "course" + x.length;

		var panel = '<div class="row panel" id="' + id + '">' + '<a href="lecture.html">';
		panel += '<div class="small-12 medium-6 large-6 columns"><h5>Course Name: ' + cname + '</h5>';
		panel += '<h6 >Course ID: ' + randomString() + '</h6></div>';
		panel += '</a>' + '<div class="small-12 medium-6 large-6 columns"><h5>Choose a file to upload:</h5><form method="post" action="" enctype="multipart/form-data"><input type="file" name="form_data" accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel"/><button type="submit" href="#" class="nice-button">Upload</button></form></div>' + '</div>';

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