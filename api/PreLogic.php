<?php
/***********************
函数：ProLogic.php
输入：
输出：

功能：监测是否有登录
************************/
//判断是否有session
date_default_timezone_set("PRC");
session_write_close();
session_start();
if(@$_SESSION['Login']['autho'] != 1){
    $data['ret'] = -1;
    echo json_encode($data);
    exit;
}

?>