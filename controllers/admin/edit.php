<?php 

require_once("../class/mysqlilib.php");




    $boardid = filter_var($_POST['boardid'],FILTER_SANITIZE_NUMBER_INT);
    $boardname = filter_var($_POST["boardname"],FILTER_SANITIZE_STRING);
    $boardsex = filter_var($_POST["boardsex"],FILTER_SANITIZE_STRING);
    $boardsubject = filter_var($_POST["boardsubject"],FILTER_SANITIZE_STRING);
    $boardcontent = filter_var($_POST["boardcontent"],FILTER_SANITIZE_STRING);


    if($boardsex == "男" || $boardsex == "女"){
        $query_update = "UPDATE board SET boardname='$boardname', boardsex='$boardsex', boardsubject='$boardsubject', boardcontent='$boardcontent', boardtime=NOW() WHERE boardid='$boardid'";
        $db['AS']->query($query_update);
        $db['AS']->close();    
    }else{
        echo false;
    }
    


