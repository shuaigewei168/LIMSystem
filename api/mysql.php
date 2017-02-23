<?php
/***********************
函数：Mysql.php
输入：
输出：

功能：配置数据库
************************/
include_once('Inc.php');
$mysqli = new mysqli(LOCALHOST,USERNAME,PASSWORD,DATABASE);
if (mysqli_connect_errno()){
	printf('Unable to connect:%s\n',mysqli_connect_error());
	exit;
}
$mysqli->set_charset('UTF8');
// $username='630880675@qq.com';
// $password='linjiawei';
// $level='1';
// $class='1';
// $phone='1344333467';
// $qqnumber='630880675';
// $realname='林家伟';

// $sql="insert into userinformation(UserName,PassWord,Level,Class,Phone,QQNumber,RealName) values(?,?,?,?,?,?,?)";
// $stmt=$mysqli->prepare($sql);
// $stmt->bind_param("ssiiiis",$username,$password,$level,$class,$phone,$qqnumber,$realname);
// $stmt->execute();
// $stmt->close();
//执行sql语句，完全面向对象的
// $result = $mysqli->query($sql);
// while($row = $result->fetch_array()){
// 	echo $row[0];
// }
?>