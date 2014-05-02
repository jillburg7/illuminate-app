<?php
$con=mysqli_connect("localhost","root","root","Illuminate");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

if ($_POST['course-name']) :
  $course = $_POST['course-name'];
  $user = 'jiggz@jillian.com';
  $code = $_POST['classcode'];
  $sql = "INSERT INTO `UserDashBoard`(`id`, `userID`, `classCode`, `className`) VALUES (null,'$user', '$code', '$course')";

  if (!mysqli_query($con,$sql)) {
    die('Error: ' . mysqli_error($con));
  }
  echo $course;
endif;

?>