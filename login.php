<?php
	$con=mysqli_connect("localhost","root","root","Illuminate");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
$type = -1;


	// if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// 	$email = test_input($_POST["email"]);
	// 	$pw = test_input($_POST["password"]);
	// }

	// function test_input($data) {
	// 	$data = trim($data);
	// 	$data = stripslashes($data);
	// 	$data = htmlspecialchars($data);
	// 	return $data;
	// }

	$result = mysqli_query($con,"SELECT * FROM CreateLogin WHERE email='$_POST[email]'");

	if(empty($result)) {
		echo "Invalid email/password combination.";
	} 
	else {
		while($row = mysqli_fetch_array($result)) {
			if ($_POST["password"] === $row['password']) {
				$type = $row['type'];
			}
			//else {Invalid email/password combination.}
		}
	}
		// echo $_SERVER['SERVER_NAME'];

	//next page delievered depends on a user's type (0 or 1)
		if ($type == 0) {
			echo header('Location: /student/dashboard.html');
			// mysqli_close($con);
		}
		else if ($type == 1) {
			echo header('Location: /instructor/dashboard.html');
			// mysqli_close($con);
		}
		else {
			echo header('Location: /index.html');
			//display error on page!
		}
?>