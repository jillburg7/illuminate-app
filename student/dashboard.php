<?php
  $con=mysqli_connect("localhost","root","root","Illuminate");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con,"SELECT * FROM UserDashBoard WHERE userID=10");
     $names =array("","","");
  int i =0;
  if(empty($result)) {
    echo "could not grab";
  } 
  else {
    while($row = mysqli_fetch_array($result)) {
        $classCode = $row['classCode'];
        $grabNames = mysqli_query($con,"SELECT * FROM ClassLecture WHERE classCode = 'classCode");
         if(empty($result)) {
          echo "could not grab";
            }
            else{
              while($row = mysqli_fetch_array($result)) {
              $names[i]=$row['className'];
              i++;
                     }
                 }
//One option: http://www.tutorialspoint.com/php/php_arrays.htm;
//Below is some working code from stackoverflow : http://stackoverflow.com/questions/3045619/need-to-store-values-from-foreach-loop-into-array
//         $items = array();
//foreach($group_membership as $username) {
// $items[] = $username;
}

print_r($items);
  }

  mysqli_close($con);

?>


<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- <title>Dashboard</title> -->
  <title>Student Dashboard</title>

  <link rel="stylesheet" href="../css/foundation.css" />
  <link rel="stylesheet" href="../css/foundation-icons.css" />
  <link rel="stylesheet" href="../css/style.css"/>

  <script src="../js/vendor/modernizr.js"></script>
</head>
<body>
    
  <div class="off-canvas-wrap">
    <div class="inner-wrap">

  <!-- Top Nav Bar -->

      <nav class="top-bar" data-topbar>
        <ul class="title-area">
          <li class="name">
            <h1><a href="dashboard.html">Illuminate</a></h1>
          </li>
          <li class="toggle-topbar menu-icon"><a href="#"></a></li>
        </ul>

        <section class="top-bar-section">
          <!-- Right Nav Section -->
          <ul class="right">
            <li><a href="#" data-reveal-id="addCourseModal" data-reveal>Add a Course</a></li>
            <li><a href="../index.html">Logout</a></li>
          </ul>
        </section>
      </nav>

      <!-- Modal fly-in/pop-up thingy-->
      <div id="addCourseModal" class="reveal-modal medium" data-reveal>
        <h4>Enter Course Information:</h4>
        <hr/>
        <h5>This information is provided by the instructor:</h5>
        <form action="addClass.php" method="POST">
         <div class="row">
            <div class="medium-10 large-10 columns">
              <!-- <label>Course ID</label> -->
              <input type="text" name="courseCode" placeholder="Course ID" />
            </div>
            <!-- <div class="medium-6 large-5 columns">
              <label>Course Code</label>
              <input type="text" placeholder="###-####" />
            </div> -->
          <!-- </div> -->
          <!-- <div class="row"> -->
            <div class="medium-2 large-2 columns">
              <a href="dashboard.html" class="tiny radius button">OK</a>
            </div>
          </div>
        </form>
        <a class="close-reveal-modal">&#215;</a>
      </div>
    <!-- End Modal fly-in/pop-up thingy-->

  <!-- CONTENT STARTS HERE ! -->

      <section class="main-section">
        <!-- content goes here -->
        <div class="row">
          <div class="large-12 columns">
            <div class="row">
              <div class="large-12 columns">
                <dl class="tabs" data-tab>
                  <dd class="active"><a href="#panel2-1"><?=$userID ?></a></dd>
                  <dd><a href="#panel2-2">Course 2</a></dd>
                  <dd><a href="#panel2-3">Course 3</a></dd>
                </dl>
                <div class="tabs-content panel radius">
                  <div class="content active" id="panel2-1">
                    <!-- First panel content goes here... -->
                    <div class="row">
                      <div class="large-12 columns">
                        <div class="row">
                   
                      <!-- Thumbnails -->
                   
                          <div class="small-12 medium-6 large-3 columns">
                            <a href="lecture.html">
                              <img src="http://placehold.it/200x200&text=Thumbnail" />
                              <h6 class="panel">Lecture ##</h6>
                            </a>
                          </div>
                   
                          <div class="small-12 medium-6 large-3 columns">
                            <a href="lecture.html">
                              <img src="http://placehold.it/200x200&text=Thumbnail" />
                              <h6 class="panel">Lecture ##</h6>
                            </a>
                          </div>
                   
                          <div class="small-12 medium-6 large-3 columns">
                            <a href="lecture.html">
                              <img src="http://placehold.it/200x200&text=Thumbnail" />
                              <h6 class="panel">Lecture ##</h6>
                            </a>
                          </div>
                   
                          <div class="small-12 medium-6 large-3 columns">
                            <a href="lecture.html">
                              <img src="http://placehold.it/200x200&text=Thumbnail" />
                              <h6 class="panel">Lecture ##</h6>
                            </a>
                          </div>
                   
                      <!-- End Thumbnails -->
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="content" id="panel2-2">
                    <p>Second panel content goes here...</p>
                  </div>
                  <div class="content" id="panel2-3">
                    <p>Third panel content goes here...</p>
                  </div>
                  <div class="content" id="panel2-4">
                    <p>Fourth panel content goes here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><br>
      <a class="exit-off-canvas"></a>

    </div>
  </div>

  <script src="../js/vendor/jquery.js"></script>
  <script src="../js/foundation.min.js"></script>
  <script>
    $(document).foundation();
  </script>
  <script src="../js/lecture_student.js"></script>
</body>
</html>
