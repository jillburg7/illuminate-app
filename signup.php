<?php
/**
* All form inputs are stored into their respective database fields to create user credentials.
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno())
    {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

  $sql="INSERT INTO CreateLogin (userID, email, password, type, firstName, lastName, studentID) VALUES (null,'$_POST[email]', '$_POST[password1]', '$_POST[userType]','$_POST[firstname]','$_POST[lastname]', $_POST[studentID])";

  if (!mysqli_query($con,$sql))
    {
    die('Error: ' . mysqli_error($con));
    }

   echo header("Location:index.html");
  mysqli_close($con);
?>