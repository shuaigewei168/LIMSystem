<?php 
/*******************************
接口：c_myapplysource.php
提交方式：Post
提交参数：
返回类型：无
返回结果：

功能：我申请的资源
********************************/
include_once('Mysql.php');
include_once('function.php');
include_once('PreLogic.php');
session_write_close();
session_start();
$loginid = $_SESSION['Login']['loginID'];
$opt = $_POST['opt'];
// $loginid = 5;
// $opt = 'getsuccesssource';
switch($opt){
    case 'getsuccesssource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`applylist`.`ApplyID` as `ApplyID`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID` and `applylist`.`LoginID`='".$loginid."' and
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

    case 'getnowsource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`applylist`.`ApplyID` as `ApplyID`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID` and `applylist`.`LoginID`='".$loginid."' and
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

    case 'getfailedsource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`applylist`.`ApplyID` as `ApplyID`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID` and `applylist`.`LoginID`='".$loginid."' and
 `applylist`.`IsAllowed`= '2' and `applylist`.`IsReturn`= '0' order by `applylist`.`ApplyTime` desc";
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

    case 'getfinishedsource':
    $sqlsource = "select `sourcelist`.`SourceID` as `SourceID`,`sourcelist`.`SourceCount` as `SourceCount`,`sourcelist`.`SourcePath` as `SourcePath`,`sourcelist`.`SourceName` as `SourceName`,`applylist`.`ApplyCount` as `ApplyCount`,`applylist`.`ApplyID` as `ApplyID`,`applylist`.`ApplyTime` as `ApplyTime`,`applylist`.`ExpectTime` as `ExpectTime`,`applylist`.`ApplyReason` as `ApplyReason`,`applylist`.`ReturnTime` as `ReturnTime` from `sourcelist`,`applylist` where `sourcelist`.`SourceID`=`applylist`.`SourceID` and `applylist`.`LoginID`='".$loginid."' and
 `applylist`.`IsAllowed`= '1' and `applylist`.`IsReturn`= '1' order by `applylist`.`ApplyTime` desc";
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

    case 'deletmyapplysource':
    $ApplyID = $_POST['ApplyID'];
    $NowCount = $_POST['NowCount'];
    $SourceID = $_POST['SourceID'];
    $tpye = $_POST['tpye'];
    $delete_sql = "delete from `applylist` where `ApplyID` = '".$ApplyID."'";
    $result = $mysqli->query($delete_sql);
    if(!$result){
        errorreturn($delete_sql.'语句执行失败');
    }
    if($tpye == '2'){
        $sql1="update `sourcelist` set `SourceCount` = '".$NowCount."' where `SourceID`='".$SourceID."'";
        $result1 = $mysqli->query($sql1);
        if($result1){
            $data['ret'] = 0;
        }else{
            errorreturn('数据修改失败');
        }
    }else{
        $data['ret'] = 0;
    }
    echo json_encode($data);
    break;

    default:
    break;
}


?>