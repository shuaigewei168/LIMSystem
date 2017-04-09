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
// $opt = 'read';
// $noticID = 18;
// 选择操作
switch($opt){
    case 'delete':
    $data['ret'] = delete_txt($mysqli,$noticID);
    echo json_encode($data);
    break;

    case 'read':
    $select_sql = "select * from `notics` where `NoticID` = '".$noticID."'";
    $result = $mysqli->query($select_sql);
    $noticdescrip = $result->fetch_assoc();
    $noticuuid = $noticdescrip['NoticUUID'];
    $type = $noticdescrip['NoticType'];
    $txt = '../'.$type.'/'.$noticuuid.'.txt';
    $content = file_get_contents($txt);
    if($result && $content){
        $data['ret'] = 0;
        $data['data']['noticdescrip'] = $noticdescrip;
        $data['data']['content'] = $content;
    }else{
        errorreturn($txt.'文件读取失败');
    }
    // 斜杠不转义
    echo json_encode($data,JSON_UNESCAPED_SLASHES);
    break;

    default:
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