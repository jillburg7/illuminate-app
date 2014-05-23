<?php
/**
* Ideally this would be searching the database for the instructor's userID since this  
* script is to show all of the instructor's courses on their dashboard.
* NEEDS development work!
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  // HARDCODED! -- this was used as an example as the database was not fully implemented at this time
  $user = 'instructor@example.com';

  $result = mysqli_query($con,"SELECT * FROM `UserDashBoard` WHERE `userID`='$user'");

  $courses = array();
  
  while($row = mysqli_fetch_array($result)) {
    $courses[] = $row['className'];
    $courses[] = $row['classCode'];
  }

  echo json_encode($courses);

?>