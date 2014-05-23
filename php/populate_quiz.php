<?php
/**
* Searches database for specified quiz_id specified by the instructor
* Retrieves row of associated data to populate quiz question/answer fields.
* NEEDS development work!
*/

  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  // HARDCODED! -- should be quiz_id
  $quiz = 'Equation';  //$_POST['quiz_id'];

  $result = mysqli_query($con,"SELECT * FROM `quiz` WHERE `quizID`='$quiz'");

  //this invokes a function to take the specific row associated with the quizID
  $row = $result->fetch_assoc();

  $question = $row['question'];
  $ansA = $row['ans_a'];
  $ansB = $row['ans_b'];
  $ansC = $row['ans_c'];
  $ansD = $row['ans_d'];
  $q = [$question, $ansA, $ansB, $ansC,$ansD];

  echo json_encode($q);
?>