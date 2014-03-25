
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
  if(x.length === 0) {
    $("#noCourses").remove();
  }
  if ($('#course-name').val() != '') {
    var name = $('#course-name').val();
    //clear field
    $('#course-name').val('');
    $('#createCourseModal').foundation('reveal', 'close');
    createNewCourse(name);
  } else {
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