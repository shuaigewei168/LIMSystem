<?php
/***********************
函数：register.php
输入：
输出：

功能：用户注册
************************/
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);
$username = $_POST['username'];
$password = $_POST['password'];
$realname = $_POST['realname'];
$phone = $_POST['phone'];
$qqnumber = $_POST['qqnumber'];
$class = $_POST['class'];
$major = $_POST['major'];
session_start();
//检查账号是否已注册
$sql = "select * from `userinformation` where `UserName`='".$username."'";
$result = $mysqli->query($sql);
if(mysqli_num_rows($result) > 0){
    errorreturn('用户名已占用');
}
$_SESSION['Login'] = null;
//把用户注册信息存入数据库
$sql="insert into userinformation(UserName,PassWord,Level,Major,Class,Phone,QQNumber,RealName,RegTime) values(?,?,'1',?,?,?,?,?,?)";
if(!$stmt=$mysqli->prepare($sql)){
    errorreturn('注册失败');
}
$stmt->bind_param("sssiiiss",$username,$password,$major,$class,$phone,$qqnumber,$realname,date('Y-m-d H:i:s'));
$stmt->execute();
$stmt->close();
$id = mysqli_insert_id($mysqli);
$_SESSION['Login']['loginID'] = $id;
$_SESSION['Login']['autho'] = 1;
$data['ret'] = '0';
echo json_encode($data);

?>