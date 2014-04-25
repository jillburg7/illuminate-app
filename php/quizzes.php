<?php
  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con,"SELECT * FROM quiz");

  while($row = mysqli_fetch_array($result)) {
    echo "<p><a>" . $row['quizID'] . "</a></p>";
  }

?>