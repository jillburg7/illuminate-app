<?php
/**
* Hack on user authentication for prototype presentation purposes.
* NEEDS development work to set up authentication and sessions!!
*/

	$con=mysqli_connect("localhost","root","root","Illuminate");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$type = -1; // type of user must be 0 (student) or 1 (instructor)

	$result = mysqli_query($con,"SELECT * FROM CreateLogin WHERE email='$_POST[email]'");

	if(empty($result)) {
		echo "Invalid email/password combination.";
	} 
	else {
		while($row = mysqli_fetch_array($result)) {
			if ($_POST["password"] === $row['password']) {
				$type = $row['type'];
			}
		}
	}

	//next page delievered depends on a user's type (0 or 1)
	if ($type == 0) {
		echo header('Location: /student/dashboard.html');
	}
	else if ($type == 1) {
		echo header('Location: /instructor/dashboard.html');
	}
	else {
		echo header('Location: /index.html');
		//display error on page!.....
	}
?>