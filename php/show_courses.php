<?php
  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $user = 'jiggz@jillian.com';  

  $result = mysqli_query($con,"SELECT * FROM `UserDashBoard` WHERE `userID`='$user'");

  $courses = array();
  
  while($row = mysqli_fetch_array($result)) {
    $courses[] = $row['classCode'];
  }

  echo json_encode($courses);

?>