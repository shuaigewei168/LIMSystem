<?php
/***********************
函数：c_applysource.php
输入：
输出：

功能：申请资源
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

    case 'applysource':
    $ApplyCount = $_POST['ApplyCount'];
    $ExpectTime = $_POST['ExpectTime'];
    $ApplyReason = $_POST['ApplyReason'];
    $NewSourceCount = $_POST['NewSourceCount'];
    $date = date('Y-m-d H:i:s');
    $IsAllowed = 0;
    $IsReturn = 0;
    $sql="insert into applylist(LoginID,SourceID,ApplyCount,ExpectTime,ApplyTime,ApplyReason,IsAllowed,IsReturn) values(?,?,?,?,?,?,?,?)";
    if(!$stmt=$mysqli->prepare($sql)){
        errorreturn($sql.'保存失败');
    }
    $stmt->bind_param("iiisssii",$_SESSION['Login']['loginID'],$SourceID,$ApplyCount,$ExpectTime,$date,$ApplyReason,$IsAllowed,$IsReturn);
    $result1 = $stmt->execute();
    $stmt->close();
    $sql="update `sourcelist` set `SourceCount` = '".$NewSourceCount."' where `SourceID`='".$SourceID."'";
    $result2 = $mysqli->query($sql);
    if($result1 && $result2){
        $data['ret'] = 0;
    }else if(!$result1){
        errorreturn('数据修改失败');
    }
    echo json_encode($data);
    break;

    default:
    break;
}


?>