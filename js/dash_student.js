// student dashboard

// stores courses added in order to keep track of them and not exceed the current
// limit of FIVE courses
var x = [];

//focuses input field in modal to create a new course
$(document).on('opened', '[data-reveal]', function () {
	$('#course-name').focus();
	$( "#target" ).submit(function(event) {
			// alert( "Handler for .submit() called." );
			event.preventDefault();
	});
});


$(document).ready(function() {
	var courses_available;

	$.ajax({
    type: 'POST',
    url: "addClass.php",
    success: function (msg) {
      if (msg !== null) {
      	courses_available = msg;
        // addNewCourse(msg);
        // $("#noCourses").remove(); 
        console.log(msg);
      }
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Details: " + desc + "\nError:" + err);
    }
  });

	/**
	* Submission of new course has been initiated.
	* Text in input field is stored as the name of course,
	*   if empty -> input field gains focus again
	* Calls createNewCourse() to generate HTML and push into course array
	*/
	$("#add-course").click(function() { //anonymous function
		if ($('#course-name').val() != '') {
			var name = $('#course-name').val();	//name in field = course name
			$('#course-name').val('');	//clear field
			$('#addCourseModal').foundation('reveal', 'close');
			if (name === courses_available){
				if(x.length === 0) {
					//previously had no active courses;
					$("#noCourses").remove(); //now we have 1 so we remove irrelevent content
					$(".main-section > .row > .large-12.columns").removeAttr("hidden");
				}
			
				// $("#noCourses").remove(); 
				addNewCourse(name);
			} else {
				$("#noCourses").before('<p style="text-align: center;">Not a valid course, please enter code again.</p><hr/>');
			}
			// $('#course-tab-details > .content.active h2').html(name);
		} else {
			//Field is empty: give focus back to the input box
			$('#course-name').focus();
		}
	});

});

/* 
* Instructor Course Creation (on dashboard.html)
* Pushes new course into an array of created courses,
*   Max capicity limit of 5 courses
*/
var addNewCourse = function(cname) {
	if (x.length < 5) {
		// index of course panel & contents
		var id = "course" + x.length;

		// clone dd.template
		var tab = $('#course-tab-titles dd.template').clone();
		$(tab).removeAttr("hidden").removeClass("template");
		// clone div.template (content for tab)
		var content = $('#course-tab-details div.template').clone();
		$(content).removeAttr("hidden").removeClass("template");

		if(x.length === 0) {
			//add tabs for number of valid courses
			$(tab).addClass("active");
			$(content).addClass("active");
		} else {
			//REMOVE ACTIVE TAGS ON ALL OTHER TABS/TAB CONTENTS!!!!
			$('#course-tab-titles').children().removeClass("active");
			$('#course-tab-details').children().removeClass("active");
			$(tab).addClass("active");
			$(content).addClass("active");
		}
		var course_id = '#' + id; 
		$(tab).html('<a href="' + course_id + '">'+ cname +'</a>');	
		$(tab).appendTo('#course-tab-titles');

		$(content).prop("id", id);
		$(content).appendTo('#course-tab-details');
		$('#course-tab-details > .content.active h2').html(cname);
				
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