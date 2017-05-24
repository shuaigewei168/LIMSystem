<?php
/***********************
函数：d_fileupload.php
输入：
输出：

功能：文件上传
************************/
include_once('PreLogic.php');
include_once('Mysql.php');
include_once('function.php');
// error_reporting(1);
session_write_close();
session_start();
$MAX_IMAGE_SIZE=10000000;     //上传文件大小限制, 单位BYTE 
$NewDir = str_replace('api','file',__DIR__);
$FileName=$_FILES['file']["name"]; 
$ToUrl = $NewDir.'\\'.$FileName;
$PathInfo=pathinfo($FileName);  
$FileType=$PathInfo['extension'];
if($MAX_IMAGE_SIZE < $_FILES['file']['size']){  
    errorreturn('文件大于10M');
}

if(!move_uploaded_file ($_FILES['file']['tmp_name'], iconv("UTF-8","gbk",$ToUrl))){  
    errorreturn('移动文件出错');  
}

$date = date('Y-m-d H:i:s',time());
$changesize = FormatBytes($_FILES['file']['size']);
$FileInsert="insert into filelist(FilePath,FileSize,FileUploadTime,UploadLoginID,FileName,FileType) values(?,?,?,?,?,?)";
if(!$stmt=$mysqli->prepare($FileInsert)){
    errorreturn($sql.'保存失败');
}else{
    $data['ret'] = 0;
    $data['data'] = '上传成功';
}
$stmt->bind_param("ssssss",$ToUrl,$changesize,$date,$_SESSION['Login']['loginID'],$FileName,$FileType);
$stmt->execute();
$stmt->close();
echo json_encode($data);





/*****************************
函数：FormatBytes
输入参数：$size 数据大小
输出：转换后的数据

功能：转换图片单位
******************************/
function FormatBytes($size) { 
$units = array(' B', ' KB', ' MB', ' GB', ' TB'); 
for ($i = 0; $size >= 1024 && $i < 4; $i++) $size /= 1024; 
return round($size, 2).$units[$i]; 
}

?>