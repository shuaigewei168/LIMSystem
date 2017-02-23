<?php
/***********************
函数：login.php
输入：
输出：

功能：用户登录
************************/
include_once('Mysql.php');
$username = $_POST['email'];
$password = $_POST['password'];
session_start();
$sql = "select * from `userinformation` where `UserName`='".$username."' 
and `PassWord`= '".$password."'";
$result = $mysqli->query($sql);
$num = mysqli_num_rows($result);
if($num != 0){
    $ret = 0;
    $userinfo = mysqli_fetch_array($result);
    // $_SESSION['Login']['username'] = $userinfo['UserName'];
    // $_SESSION['Login']['qqnumber'] = $userinfo['QQNumber'];
    // $_SESSION['Login']['level'] = $userinfo['Level'];
    // $_SESSION['Login']['class'] = $userinfo['Class'];
    // $_SESSION['Login']['realname'] = $userinfo['RealName'];
    $_SESSION['Login']['loginID'] = $userinfo['ID'];
    $_SESSION['Login']['autho'] = 1;
}else{
    $ret = 1;
    $_SESSION['Login']['autho'] = 0;
}
session_write_close();
$data['ret'] = $ret;
echo json_encode($data);
?>