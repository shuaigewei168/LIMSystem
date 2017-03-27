<?php
/***********************
函数：sendnews.php
输入：
输出：

功能：发布消息
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
error_reporting(1);
$type = $_POST['type'];
$text = $_POST['text'];
$title = $_POST['title'];
$shorttext = substr($text , 0 , 30);
$noticuuid = $type.time();
session_start();
$sql="insert into notics(NoticTitle,NoticText,NoticType,NoticUUID,SaveTime,NoticAuthor) values(?,?,?,?,?,?)";
if(!$stmt=$mysqli->prepare($sql)){
    errorreturn($type.'保存失败');
}
$stmt->bind_param("ssssss",$title,$shorttext,$type,$noticuuid,date('Y-m-d H:i:s'),$_SESSION['Login']['realname']);
$stmt->execute();
$stmt->close();
$txt = '../'.$type.'/'.$noticuuid.'.txt';
$fp = fopen($txt,"a+");
//写入内容
fwrite($fp,$text);
//关闭资源
fclose($fp);
$data['ret'] = '0';
echo json_encode($data);

?>