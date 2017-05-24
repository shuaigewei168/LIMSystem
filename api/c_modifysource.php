<?php
/***********************
函数：c_modifysource.php
输入：
输出：

功能：修改资源
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
// error_reporting(1);
session_write_close();
session_start();
$opt = $_POST['opt'];
$SourceID = $_POST['SourceID'];
switch($opt){
    case 'getsource':
    $sqlsource = "select * from `sourcelist` where `SourceID` = '".$SourceID."'";
    $sourcedata = $mysqli->query($sqlsource);
    if($sourcedata){
        $sourcedata = mysqli_fetch_assoc_all($sourcedata);
        $data['data'] = $sourcedata;
        $data['ret']=0;
    }else{
        $data['ret']=1;
    }
    echo json_encode($data);
    break;

    case 'modifysource':
    $ModifyCount = $_POST['ModifyCount'];
    $ModifyName = $_POST['ModifyName'];
    $NewTotalCount = $_POST['NewTotalCount'];
    $sql1="update `sourcelist` set `TotalCount` = '".$NewTotalCount."' where `SourceID`='".$SourceID."'";
    $sql2="update `sourcelist` set sourcelist.SourceCount = '".$ModifyCount."' where `SourceID`='".$SourceID."'";
    $result1 = $mysqli->query($sql1);
    $result2 = $mysqli->query($sql2);
    if($result1 && $result2){
        $data['ret'] = 0;
    }else{
        errorreturn('数据修改失败');
    }
    echo json_encode($data);
    break;

    default:
    break;
}


?>