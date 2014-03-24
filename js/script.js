
// var selected_file = $('#input').get(0).files[0];

// $(document).on('open.fndtn.alert-box', function(event) {
// 	console.info('An alert box has been open!');
// });
var x = [];

$(document).on('opened', '[data-reveal]', function () {
	$('#course-name').focus();
	$( "#target" ).submit(function(event) {
	  	// alert( "Handler for .submit() called." );
	  	event.preventDefault();
	});
});

$("#add-course").click(function() { //anonymous function
	if(x.length === 0) {
		$("#noCourses").remove();
	}
	if ($('#course-name').val() != '') {
		var name = $('#course-name').val();
		$('#course-name').val('');
		$('#createCourseModal').foundation('reveal', 'close');
		createNewCourse(name);
	} else {
		$('#course-name').focus();
	}
});

//need a data structure to contain expanding list of added courses, with a max capicity limit
var createNewCourse = function(cname) {
	if (x.length < 5) {
		// index of course panel & contents
		var id = "course" + x.length;

		var panel = '<div class="row panel" id="' + id + '">' + '<a href="lecture.html">';
		panel += '<h5 >Course Name: ' + cname + '</h5>';
		panel += '<h6 >Course ID: ' + randomString() + '</h6>';
		panel += '</a>' + '</div>';

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