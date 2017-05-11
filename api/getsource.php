<?php 
/*******************************
接口：getsource.php
提交方式：Post
提交参数：
返回类型：无
返回结果：

功能：获取资源
********************************/
include_once('Mysql.php');
include_once('function.php');
include_once('PreLogic.php');
session_write_close();
session_start();
$sqlsource = "select * from `sourcelist` order by `UploadTime` desc";
$sourcedata = $mysqli->query($sqlsource);
if($sourcedata){
    $sourcedata = mysqli_fetch_assoc_all($sourcedata);
    $data['data'] = $sourcedata;
    $data['ret']=0;
}else{
    $data['ret']=1;
}
echo json_encode($data);
?>