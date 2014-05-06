<?php
$con=mysqli_connect("localhost","root","root","Illuminate");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$quizid = 'Equation'; //$_POST['quiz_id'];
$user = 'jill@jillian.com';
$answer = $_POST['quiz_ans'];

  $sql = "INSERT INTO `quiz_response`(`id`, `quizID`, `userID`, `student_ans`) VALUES (null, '$quizid', '$user', '$answer')";

  if (!mysqli_query($con,$sql)) {
    die('Error: ' . mysqli_error($con));
  }

?>