<?php
/***********************
函数：e_sendemail.php
输入：
输出：

功能：发送邮件
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
session_write_close();
$reciver = $_POST['reciver'];
$text = $_POST['text'];
$title = $_POST['title'];
$sketch = $_POST['sketch'];
$SenderName = $_SESSION['Login']['username'];
$shorttext = $sketch;
$EmailUUID = $SenderName.time();
$date = date('Y-m-d H:i:s');
session_start();
$sql="insert into emaillist(ReciverName,SenderName,SendTime,EmailTitle,EmailText,EmailUUID) values(?,?,?,?,?,?)";
if(!$stmt=$mysqli->prepare($sql)){
    errorreturn($type.'保存失败');
}
$stmt->bind_param("ssssss",$reciver,$SenderName,$date,$title,$shorttext,$EmailUUID);
$stmt->execute();
$stmt->close();
$txt = '../emails/'.$EmailUUID.'.txt';
$fp = fopen($txt,"a+");
//写入内容
fwrite($fp,$text);
//关闭资源
fclose($fp);
$data['ret'] = '0';
echo json_encode($data);

?>