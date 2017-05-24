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
$ApplyID = $_POST['ApplyID'];
switch($opt){
    case 'getsource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`applylist`.`ApplyID` as `ApplyID`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID` and `applylist`.`ApplyID`='".$ApplyID."' and
 `applylist`.`IsAllowed`= '1' and `applylist`.`IsReturn`= '0'  order by `applylist`.`ApplyTime` desc";
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

    case 'guihuanmyapplysource':
    $ApplyID = $_POST['ApplyID'];
    $NowCount = $_POST['NowCount'];
    $SourceID = $_POST['SourceID'];
    $date = date('Y-m-d H:i:s');
    $sql1="update `sourcelist` set `SourceCount` = '".$NowCount."' where `SourceID`='".$SourceID."'";
    $sql2="update `applylist` set `IsReturn` = '1',`ReturnTime` ='".$date."' where `ApplyID`='".$ApplyID."'";
    $result1 = $mysqli->query($sql1);
    $result2 = $mysqli->query($sql2);
    if($result1&&$result2){
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