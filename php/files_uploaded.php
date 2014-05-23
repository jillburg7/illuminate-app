<?php
/**
* Lists all of the files uploaded (in the /server/ directory).
* Needs development work.
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con,"SELECT * FROM `files`");

  $files = array();

  while($row = mysqli_fetch_array($result)) {
    $files[] = $row['name'];
  }

  echo json_encode($files);

?>