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
$opt = $_POST['opt'];
switch($opt){
    case 'getsource':
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
    break;

    case 'deletesource':
    $SourceID = $_POST['SourceID'];
    $sqlapplysource = "select * from `applylist` where `SourceID` ='".$SourceID."'";
    $sourcedata = $mysqli->query($sqlapplysource);
    $applysourcedata = mysqli_fetch_assoc_all($sourcedata);
    if(count($applysourcedata) == 0){
        $data['ret'] = delete_image($mysqli,$SourceID);
    }else{
        $data['data']='该资源已有部分被借出，不能进行删除';
        $data['ret']=1;
    }
    echo json_encode($data);
    break;

    default:
    break;
}

function delete_image($mysqli,$SourceID){
    $select_sql = "select * from `sourcelist` where `SourceID` = '".$SourceID."'";
    $result = $mysqli->query($select_sql);
    $data = $result->fetch_assoc();
    $SourceDestination = $data['SourceDestination'];
    if(unlink($SourceDestination)){
        $delete_sql = "delete from `sourcelist` where `SourceID` = '".$SourceID."'";
        $result = $mysqli->query($delete_sql);
        if($result){
            return 0;
        }else{
            errorreturn($delete_sql.'语句执行失败');
        }
    }else{
        errorreturn($SourceDestination.'文件删除失败');
    }
}
?>