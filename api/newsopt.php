<?php
/***********************
函数：newsopt.php
输入：opt=delete|read & noticID=xxx
输出：

功能：对消息的操作
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);
session_start();
$opt = $_POST['opt'];
$noticID = $_POST['noticID'];
// 选择操作
switch($opt){
    case 'delete':
    $data['ret'] = delete_txt($mysqli,$noticID);
    echo json_encode($data);
    break;
}

function delete_txt($mysqli,$noticID){
    $select_sql = "select * from `notics` where `NoticID` = '".$noticID."'";
    $result = $mysqli->query($select_sql);
    $data = $result->fetch_assoc();
    $noticuuid = $data['NoticUUID'];
    $type = $data['NoticType'];
    $txt = '../'.$type.'/'.$noticuuid.'.txt';
    if(unlink($txt)){
        $delete_sql = "delete from `notics` where `NoticID` = '".$noticID."'"."and `NoticUUID` = 
        '".$noticuuid."'";
        $result = $mysqli->query($delete_sql);
        if($result){
            return 0;
        }else{
            errorreturn($delete_sql.'语句执行失败');
        }
    }else{
        errorreturn($txt.'文件删除失败');
    }
}

?>