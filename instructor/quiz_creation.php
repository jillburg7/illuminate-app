<?php
/**
* All form inputs are stored into their respective database cells.
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  // help from the internets:
  // you can access the values posted by jQuery.ajax
  // through the global variable $_POST, like this:
  // $bar = $_POST['bar'];

  $quizid = $_POST['quiz_id'];
  $q = $_POST['question'];
  $ans_a = $_POST['answerA'];
  $ans_b = $_POST['answerB'];
  $ans_c = $_POST['answerC'];
  $ans_d = $_POST['answerD'];
  $ans = $_POST['multipleChoice'];

  $sql = "INSERT INTO `quiz`(`id`, `quizID`, `question`, `ans_a`, `ans_b`, `ans_c`, `ans_d`, `answer`) VALUES (null,'$quizid','$q','$ans_a','$ans_b','$ans_c','$ans_d','$ans')";

  if (!mysqli_query($con,$sql)) {
    die('Error: ' . mysqli_error($con));
  }
  
?>