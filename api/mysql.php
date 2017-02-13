<?php
/***********************
函数：mysql.php
输入：
输出：

功能：配置数据库
************************/
include_once('inc.php');
//创建对象并打开连接，最后一个参数是选择的数据库名称
$mysqli = new mysqli(LOCALHOST,USERNAME,PASSWORD,TABLE);
//检查连接是否成功
if (mysqli_connect_errno()){
	//注意mysqli_connect_error()新特性
	die('Unable to connect!'). mysqli_connect_error();
}
$sql = "select * from vol_msg";
//执行sql语句，完全面向对象的
// $result = $mysqli->query($sql);
// while($row = $result->fetch_array()){
// 	echo $row[0];
// }
?>