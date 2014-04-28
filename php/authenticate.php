<?php
function authenticate()
{
    if (isset($_POST['email']) && isset($_POST['password']))
    { 
        // if the user has just tried to log in
        $user = $_POST['email'];
        $password = $_POST['password'];
        
        $query = 'SELECT * FROM CreateLogin where email="'.$user.'" and password="'.$password.'"';
        
        include 'db_connect.php'; //link to your database 

        $result = $db->query($query);
        $num_rows=$result->num_rows;
        
        if ($num_rows > 0)
        {
          $_SESSION['email'] = $user;   // if they are in the database register the user id
          $db->close();
        }
    } 
    //if isset post email and post password
    if (isset($_SESSION['email']))
    {
        { 
            echo 'You are logged in as <strong> '
                   . ''.$_SESSION['email'].'</strong>';
        }
     }
}
 ?>