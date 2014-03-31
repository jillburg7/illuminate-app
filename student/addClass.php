<?php
	$con=mysqli_connect("localhost","root","root","Illuminate");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
$type = '';



$sql="INSERT INTO UserDashBoard (ID, userID, classCode)
VALUES
(null,'$_POST[userID]', '$_POST[courseCode]')";

if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo include 'dashboard.html';
mysqli_close($con);

?>