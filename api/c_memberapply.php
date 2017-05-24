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
// $SourceID = $_POST['SourceID'];
switch($opt){
    case 'getapplyssource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`applylist`.`ApplyID` as `ApplyID`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID`  and
 `applylist`.`IsAllowed`= '0' and `applylist`.`IsReturn`= '0'  order by `applylist`.`ApplyTime` desc";
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

    case 'refuse':
    $ApplyID = $_POST['ApplyID'];
    $NowCount = $_POST['NowCount'];
    $SourceID = $_POST['SourceID'];
    $sql1="update `sourcelist` set `SourceCount` = '".$NowCount."' where `SourceID`='".$SourceID."'";
    $sql2="update `applylist` set `IsAllowed` = '2' where `ApplyID`='".$ApplyID."'";
    $result1 = $mysqli->query($sql1);
    $result2 = $mysqli->query($sql2);
    if($result1&&$result2){
        $data['ret'] = 0;
    }else{
        errorreturn('数据修改失败');
    }
    echo json_encode($data);
    break;

    case 'agree':
    $ApplyID = $_POST['ApplyID'];
    $sql1="update `applylist` set `IsAllowed` = '1' where `ApplyID`='".$ApplyID."'";
    $result1 = $mysqli->query($sql1);
    if($result1){
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