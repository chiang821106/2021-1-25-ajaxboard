<?php 

require_once("../class/mysqlilib.php");




    $boardid = $_POST['boardid'];
    $boardname = $_POST["boardname"];
    $boardsex = $_POST["boardsex"];
    $boardsubject = $_POST["boardsubject"];
    $boardcontent = $_POST["boardcontent"];

    $query_update = "UPDATE board SET boardname='$boardname', boardsex='$boardsex', boardsubject='$boardsubject', boardcontent='$boardcontent', boardtime=NOW() WHERE boardid='$boardid'";
    $db['AS']->query($query_update);
    $db['AS']->close();
   


