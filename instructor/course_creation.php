<?php
/**
* Inserts a new course into the database with the course name specified in the 
* form input field by an instructor user. The pseudorandom course code is 
* generated prior to starting the db connection and is stored with the course
* name and instructor userID.
* NEEDS development work! -- User sessions NEED to be implemented!!
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($_POST['course-name']) :

    // HARDCODED! -- this should be setup with the user session...once implemented.
    $user = 'instructor@example.com'; //should be the userID of the instructor creating a course
    $course = $_POST['course-name'];
    $code = $_POST['classcode'];
    $sql = "INSERT INTO `UserDashBoard`(`id`, `userID`, `classCode`, `className`) VALUES (null,'$user', '$code', '$course')";

    if (!mysqli_query($con,$sql)) {
      die('Error: ' . mysqli_error($con));
    }
    echo $course;
  endif;

?>