<?php
$con=mysqli_connect("localhost","root","root","Illuminate");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql = "INSERT INTO `quiz`(`id`, `quizID`, `question`, `ans_a`, `ans_b`, `ans_c`, `ans_d`, `answer`) VALUES (null,'$_POST[quiz_id]','$_POST[question]','$_POST[answerA]','$_POST[answerB]','$_POST[answerC]','$_POST[answerD]','$_POST[multipleChoice]')";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}

echo header("Location: dashboard.html");
mysqli_close($con);
?>