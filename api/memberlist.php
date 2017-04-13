<?php
/***********************
函数：memberlist.php
输入：
输出：

功能：获取成员列表
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);
session_start();
$opt = $_POST['opt'];
switch($opt){
    case 'getinfo':
    $subnotic = $_POST['subnotic'];
    $usersql = "select * from `userinformation`";
    $result1 = $mysqli->query($usersql);
    $userinfo = mysqli_fetch_assoc_all($result1);
    foreach ($userinfo as $key => $value) {
        $items[$key]['userID'] = $value['ID'];
        $items[$key]['major'] = $value['Major'];
        $items[$key]['class'] = $value['Class'];
        $items[$key]['group'] = $value['Major'].$value['Class'].'班';
        $items[$key]['realname'] = $value['RealName'];
        $items[$key]['username'] = $value['UserName'];
        $items[$key]['level'] = $value['Level'];
        $items[$key]['mobile'] = $value['Phone'];
        $items[$key]['qqnumber'] = $value['QQNumber'];
        $items[$key]['regtime'] = $value['RegTime'];
        $items[$key]['avaliable'] = $value['Avaliable'];
    }

    $groupsql = "select `Major`,`Class` from `userinformation` group by `Major`,`Class`";
    $result2 = $mysqli->query($groupsql);
    $groupinfo = mysqli_fetch_assoc_all($result2);
    foreach ($groupinfo as $key => $value) {
        $groups[$key]['name'] = $value['Major'].$value['Class'].'班';
    }
    if($result1 && $result2){
        $data['ret'] = 0;
        $data['data']['items'] = $items;
        $data['data']['groups'] = $groups;
        echo json_encode($data);
    }else{
        errorreturn('获取成员列表错误');
    }
    break;

    case 'saveinfo':
    $userID = $_POST['userID'];
    $major = $_POST['major'];
    $class = $_POST['class'];
    $realname = $_POST['realname'];
    $username = $_POST['username'];
    $level = $_POST['level'];
    $mobile = $_POST['mobile'];
    $qqnumber = $_POST['qqnumber'];
    $regtime = $_POST['regtime'];
    $avaliable = $_POST['avaliable'];
    //检查账号是否已注册
    // $sql = "select * from `userinformation` where `UserName`='".$username."'";
    // $result = $mysqli->query($sql);
    // if(mysqli_num_rows($result) > 0){
    //     errorreturn('用户名已占用');
    // }
    //把用户注册信息存入数据库
    $sql="update `userinformation` set `RealName` = '".$realname."' , `Level` = '".$level."', `Phone` = '".$mobile."'"
    .", `QQNumber` = '".$qqnumber."', `RegTime` = '".$regtime."', `Avaliable` = '".$avaliable."', `Major` = '".$major."', `Class` = '".$class."' where `ID`='".$userID."'
    and `UserName`='".$username."'";
    $result = $mysqli->query($sql);
    if($result){
        $data['ret'] = 0;
        echo json_encode($data);
    }else{
        errorreturn('数据修改失败');
    }
    break;

    default:
    break;
}


?>