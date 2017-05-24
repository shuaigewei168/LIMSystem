<?php 
/*******************************
接口：d_sharefile.php
提交方式：Post
提交参数：
返回类型：无
返回结果：

功能：获取文件
********************************/
include_once('Mysql.php');
include_once('function.php');
include_once('PreLogic.php');
session_write_close();
session_start();
if(isset($_GET['opt'])){
    $opt = $_GET['opt'];
}else{
    $opt = $_POST['opt'];
}

switch($opt){
    case 'getfile':
    $sqlfile = "select * from `filelist` order by `FileUploadTime` desc";
    $filedata = $mysqli->query($sqlfile);
    if($filedata){
        $filedata = mysqli_fetch_assoc_all($filedata);
        $data['data'] = $filedata;
        $data['ret']=0;
    }else{
        $data['ret']=1;
    }
    echo json_encode($data);
    break;

    case 'deletefile':
    $fileID = $_POST['FileID'];
    $sqlapplyfile = "select * from `filelist` where `FileID` ='".$fileID."'";
    $filedata = $mysqli->query($sqlapplyfile);
    $applyfiledata = mysqli_fetch_assoc_all($filedata);
    if(!count($applyfiledata) == 0){
        $data['ret'] = delete_file($mysqli,$fileID);
    }else{
        $data['data']='不存在该资源';
        $data['ret']=1;
    }
    echo json_encode($data);
    break;

    case 'download':
    $fileID = $_GET['FileID'];
    $select_sql = "select * from `filelist` where `FileID` = '".$fileID."'";
    $result = $mysqli->query($select_sql);
    $data = $result->fetch_assoc();
    $FileName = $data['FileName'];
    $FilePath = $data['FilePath'];
    $ImageName=iconv("utf-8","gbk",$FileName);
    $ImageDestination = iconv("utf-8","gbk",$FilePath);
    $FileOpen=fopen($ImageDestination,"r+");
    $FileSize=filesize($ImageDestination);


    //返回的文件
    header("Content-type: application/octet-stream");
    //这里客户端的弹出对话框，对应的文件名
    header("Content-Disposition: attachment; filename=".$ImageName);
    $buffer=1024;
    $FileCount=0;
    //判断文件是否结束
    while(!feof($FileOpen) && ($FileSize-$FileCount>0) ){
        $FileData=fread($FileOpen,$buffer);
        $FileCount+=$buffer;
        echo $FileData;
    }
    fclose($FileOpen);

    break;

    default:
    break;
}

function delete_file($mysqli,$fileID){
    $select_sql = "select * from `filelist` where `FileID` = '".$fileID."'";
    $result = $mysqli->query($select_sql);
    $data = $result->fetch_assoc();
    $fileDestination = $data['FilePath'];
    if(unlink($fileDestination)){
        $delete_sql = "delete from `filelist` where `FileID` = '".$fileID."'";
        $result = $mysqli->query($delete_sql);
        if($result){
            return 0;
        }else{
            errorreturn($delete_sql.'语句执行失败');
        }
    }else{
        errorreturn($fileDestination.'文件删除失败');
    }
}
?>