<?php






// 接收前端傳遞的值
$boardname = filter_var($_POST['boardname'],FILTER_SANITIZE_STRING);
$boardsex = filter_var($_POST['boardsex'],FILTER_SANITIZE_STRING);
$boardsubject = filter_var($_POST['boardsubject'],FILTER_SANITIZE_STRING);
$boardcontent = filter_var($_POST['boardcontent'],FILTER_SANITIZE_STRING);


require_once("../class/mysqlilib.php");

if($boardsex == "男" || $boardsex == "女"){
    $sql = "INSERT INTO board(boardname,boardsex,boardsubject,boardcontent,boardtime) VALUES ('$boardname','$boardsex','$boardsubject','$boardcontent',NOW())";
    $db['AS']->query($sql);
    $db['AS']->close();
}else{
    echo false;
}



// $query_insert = "INSERT INTO board (boardname ,boardsex ,boardsubject ,boardcontent,boardtime) VALUES (?, ?, ?, ?,NOW())";
// //預備語法
// $stmt = $db['AS']->prepare($query_insert);
// $stmt->bind_param(
//     "ssss",$boardname,$boardsex,$boardsubject,$boardcontent
// );
// $stmt->execute();
// $stmt->close();

?>

