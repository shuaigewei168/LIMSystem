<?php
/***********************
函数：getuserinfo.php
输入：
输出：

功能：获取用户信息
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
//判断是否有session
// session_start();
if(@$_SESSION['Login']['autho'] == 1){
    $sql = "select * from `userinformation` where `ID`='".$_SESSION['Login']['loginID']."'";
    $result = $mysqli->query($sql);
    $userinfo = mysqli_fetch_array($result);
    $data['data'] = $userinfo;
    $ret=0;
}else{
    errorreturn('获取用户信息失败');
}
session_write_close();
$data['ret'] = $ret;
echo json_encode($data);




?>