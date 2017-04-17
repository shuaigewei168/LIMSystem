<?php
date_default_timezone_set("PRC");
include_once('Mysql.php');
/***********************
函数：logresult
输入：
输出：

功能：日志记录
************************/
// logresult('测试一下Log');
function logresult($msg){
    $txt = '../log.txt';
    $fp = fopen($txt,"a+");
    //写入内容
    fwrite($fp,$msg."   时间：".date('Y-m-d H:i:s')."\r\n");
    //关闭资源
    fclose($fp);
}

/***********************
函数：errorreturn
输入：
输出：

功能：错误返回
************************/
// logresult('测试一下Log');
function errorreturn($msg){
    $data['ret'] = '1';
    $data['data'] = $msg;
    logresult($msg);
    echo json_encode($data);
    exit;
}


/*****************************
函数：mysqli_fetch_assoc_all_rs
输入参数：mysqli类结果集 $rs
输出：包含查询结果集所有行的数组

功能：获取mysql查询结果集中的所有数据
******************************/
function mysqli_fetch_assoc_all($rs){
    while ($row = $rs->fetch_assoc()) {
    	$data[] = $row;
    }
    if(empty($data)){
		return array();
	}
	else{
        return $data;
	}
}

/*****************************
函数：mysql_fetch_query_str
输入参数：mysql查询结果集 $rs
输出：将结果集中的指定字段转换为可以用于mysql in 查询的字符串

功能：获取mysql查询结果集中的指定字段的in查询字符串
******************************/
function mysqli_fetch_query_str($rs,$field,$type='string'){
    $str = "";
    while($a=$rs->fetch_assoc()){
        if($type == 'int'){
            $str .= $a[$field].',';
        }
        else{
            $str .= "'".$a[$field]."'".',';
        }
    }
    return '('.trim($str,',').')';
}

/********************
函数：set_url_encode
输入参数：$data
输出参数：url请求参数的url编码

功能：将GET请求的参数进行编码
*********************/
function set_url_encode($data){
    foreach ($data as $key => $value) {
        $str .=$key."=".urlencode($value)."&";
    }
    return trim($str,"&");
}

/********************
函数：email
输入参数：$to,$title,$body
输出参数：true,false(发送成功或者失败)

功能：发送邮件个指定的地址
*********************/
function email($to,$title,$body){
	$url=MESSAGE."/mail.php?to=".urlencode($to).'&title='.urlencode($title).'&body='.urlencode($body);
	$rs=file_get_contents($url);
	$data = json_decode($rs,true);
	if($data['ret'] === 0) return true;
	else return false;
}
function email1($to,$title,$body){
	if(preg_match('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i',$to)){}
	else{
		return false;
	}
	$now = date("Y-m-d h:i:s");
	$from_name = '自动化协会';
	$from_name = "=?UTF-8?B?".base64_encode($from_name)."?=";
	$from_email = 'shuaigewei168@163.com';
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= "Content-Transfer-Encoding: 8bit\r\n";
	$headers .= "From: $from_name <$from_email>\r\n";
	
	$subject = "=?UTF-8?B?".base64_encode($title)."?=";
	if (mail($to, $subject, $body, $headers)) {
		return true;
	}
	else{
		return false;
	}
}

/*****************************
函数：PostParamCheck
输入参数：无
输出：无

功能：检查Post是否满足传参要求
******************************/
function PostParamCheck(){
  if(is_null($_POST['sourcename']) || !isset($_POST['sourcename']) || $_POST['sourcename']==''){
      errorreturn('参数sourcename有误', print_r($_POST,true));
      exit;
  }
  if(is_null($_POST['sourcecount']) || !isset($_POST['sourcecount']) || $_POST['sourcecount']==''){
      errorreturn('参数sourcecount有误', print_r($_POST,true));
      exit;
  }
}

?>