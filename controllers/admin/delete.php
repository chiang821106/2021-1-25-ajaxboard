<?php

require_once("../class/mysqlilib.php");

// 執行刪除動作
    $boardid = $_POST['boardid'];
    $sql_query = "DELETE FROM board WHERE boardid=$boardid";
    $db['AS']->query($sql_query);
    $db['AS']->query($query_update);
    $db['AS']->close();