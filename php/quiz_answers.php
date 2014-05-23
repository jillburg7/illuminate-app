<?php
/**
* Inserts a student's quiz response into the database table.
* NEEDS development work !!
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  // HARDCODED! -- should be quiz_id
  $quizid = 'Equation'; //$_POST['quiz_id'];
  // HARDCODED! -- should be the userID of the student that submitted a response to a quiz question
  $user = 'user@example.com'; 
  $answer = $_POST['quiz_ans'];

  $sql = "INSERT INTO `quiz_response`(`id`, `quizID`, `userID`, `student_ans`) VALUES (null, '$quizid', '$user', '$answer')";

  if (!mysqli_query($con,$sql)) {
    die('Error: ' . mysqli_error($con));
  }

?>