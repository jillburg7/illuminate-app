<?php
  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con,"SELECT * FROM `files`");

  while($row = mysqli_fetch_array($result)) {
    echo "<li><a>" . $row['name'] . "</a></li>";
  }

?>