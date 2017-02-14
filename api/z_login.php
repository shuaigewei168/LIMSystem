<?php
/***********************
函数：z_login.php
输入：
输出：

功能：用户登录
************************/
include_once('mysql.php');
$username = $_POST['email'];
$password = $_POST['password'];

$sql = "select * from `userinformation` where `UserName`='".$username."' 
and `PassWord`= '".$password."'";
// $sql="select * from `userinformation` where `UserName`='630880675@qq.com' 
// and `PassWord`= 'linjiawei'";
$result = $mysqli->query($sql);
$num = mysqli_num_rows($result);
if($num != 0){
    $ret = 0;
}else{
    $ret = 1;
}
$data['ret'] = $ret;
echo json_encode($data);


// echo $username;
// echo '<br>';
// echo $password;
?>