<?php
  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con,"SELECT * FROM `files`");
  $i=0;
  while($row = mysqli_fetch_array($result)) {
    echo "<li><a id='". $i++ ."'>" . $row['name'] . "</a></li>";
  }

?>