<?php
/***********************
函数：e_emaillist.php
输入：
输出：

功能：收件箱
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);
session_start();
$SenderName = $_SESSION['Login']['username'];
$sql = "select * from `emaillist` where `ReciverName` = '".$SenderName."' order by `SendTime` desc";
$result = $mysqli->query($sql);
$emaildata = mysqli_fetch_assoc_all($result);
$data['data'] = $emaildata;
if($result){
    $data['ret'] = 0;
    echo json_encode($data);
}else{
    errorreturn('获取邮件失败');
}
exit;


?>