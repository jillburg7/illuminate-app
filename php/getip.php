<?php
  if ($_GET['ip']) :
    $ip = gethostbyname($_GET['ip']);
    echo ($ip);
    // echo(gethostbyname('localhost'));
  endif;
?>