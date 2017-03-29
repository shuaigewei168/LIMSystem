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

$sqltask = "select * from `notics` where `NoticType` = 'task' order by `SaveTime` desc";
$result1 = $mysqli->query($sqltask);
$taskinfo = mysqli_fetch_assoc_all($result1);
//数据库信息不够4条，用来占位置
if(count($taskinfo)<4){
    for($i=count($taskinfo);$i<4;$i++){
        $taskinfo[$i]['NoticTitle']='无标题';   
        $taskinfo[$i]['NoticText']='无内容'; 
    }
}
$data['data']['task'] = $taskinfo;

$sqlmessage = "select * from `notics` where `NoticType` = 'message' order by `SaveTime` desc";
$result2 = $mysqli->query($sqlmessage);
$messageinfo = mysqli_fetch_assoc_all($result2);
if(count($messageinfo)<4){
    for($i=count($messageinfo);$i<4;$i++){
        $messageinfo[$i]['NoticTitle']='无标题';   
        $messageinfo[$i]['NoticText']='无内容'; 
    }
}
$data['data']['message'] = $messageinfo;

$sqlarticle = "select * from `notics` where `NoticType` = 'article' order by `SaveTime` desc";
$result3 = $mysqli->query($sqlarticle);
$articleinfo = mysqli_fetch_assoc_all($result3);
if(count($articleinfo)<4){
    for($i=count($articleinfo);$i<4;$i++){
        $articleinfo[$i]['NoticTitle']='无标题';   
        $articleinfo[$i]['NoticText']='无内容'; 
    }
}
$data['data']['article'] = $articleinfo;

$sqlquestion = "select * from `notics` where `NoticType` = 'question' order by `SaveTime` desc";
$result4 = $mysqli->query($sqlquestion);
$questioninfo = mysqli_fetch_assoc_all($result4);
if(count($questioninfo)<4){
    for($i=count($questioninfo);$i<4;$i++){
        $questioninfo[$i]['NoticTitle']='无标题';   
        $questioninfo[$i]['NoticText']='无内容'; 
    }
}
$data['data']['question'] = $questioninfo;

if($result1 && $result2 && $result3 && $result4){
    $data['ret'] = 0;
    echo json_encode($data);
}else{
    errorreturn('获取消息失败');
}
exit;


?>