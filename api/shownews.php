<?php
/***********************
函数：shownews.php
输入：
输出：

功能：显示消息
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);

session_start();
$sql = "select * from `notics` where `NoticType`='task'";
$result = $mysqli->query($sql);
$articleinfo = mysqli_fetch_assoc_all($result);
$data['ret'] = 0;
$data['data'] = $articleinfo;
echo json_encode($data);

?>