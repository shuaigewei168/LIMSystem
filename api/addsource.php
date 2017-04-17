<?php 
/*******************************
接口：addsource.php
提交方式：Post
提交参数：uploadimage=xxx&username=xxx&source=xxx&dir=xxx
        uploadimage:上传的图片文件 
        username:用户名
        source:来自的产品编号
        dir:目录名称
返回类型：无
返回结果：{"ret":0,"data":{"imageurl":"127.0.0.1/acceptfile/images/mobile/test1/1483603307.jpeg",
          "destination":"D:/uwamp/www/acceptfile/images/mobile/test1/1483603307.jpeg","imagename":"1483603307.jpeg","imagesize":109140}}
        imageurl:图片的访问地址 
        destination:图片的物理存储地址
        imagename:图片名字
        imagesize:图片大小

功能：上传图片
********************************/
include_once('Mysql.php');
include_once('function.php');
$sourcename = $_POST['sourcename'];
$sourcecount = $_POST['sourcecount'];
PostParamCheck(); //检查post的参数
$UpTypes=array('jpg', 'jpeg','png','pjpeg','gif','bmp','x-png'); //允许的图片类型    
$MAX_IMAGE_SIZE=2000000;     //上传文件大小限制, 单位BYTE 
$NewDir = str_replace('api','images',__DIR__);
// $NewDir = $NewDir."/".$_POST['source']."/".$_POST['username']."/".$_POST['dir']."/"; //保存路径

//判断能够获取图片size，如果不能获取,则证明不是图片
if(!getimagesize($_FILES["uploadimage"]['tmp_name'])){
    errorreturn('上传的文件不是图片', print_r($_FILES,true)); 
    exit;
}

//是否添加了文件
if (!is_uploaded_file($_FILES["uploadimage"]['tmp_name'])){  
    errorreturn('图片不存在', print_r($_FILES,true));   
    exit;  
}

$file = $_FILES["uploadimage"];
ImageFormatCheck($UpTypes,$MAX_IMAGE_SIZE,$file); //检查文件的格式是否符合限制
$strDomainName = DomainName;

//检查文件夹是否存在，不存在则创建
if(!file_exists($NewDir)){ 
    $NewNewDir=iconv("UTF-8","gbk",$NewDir); 
    if(!mkdir($NewNewDir,0777,true)){
        errorreturn('创建文件夹失败', print_r($NewDir,true));
    }
    // $directorydata_Insert = "INSERT INTO `directorydata`(`DomainName`,`Source`,`UserName`,`DirName`) values(?,?,?,?)";
	// $stmt = $mysqli->prepare($directorydata_Insert);
	// $stmt->bind_param("ssss",$strDomainName,$_POST['source'],$_POST['username'],$_POST['dir']);
	// $stmt->execute();
    // $directoryID =  mysqli_insert_id($mysqli);
	// if ($mysqli->affected_rows == 0) {
	// 	errorreturn('数据库异常！', print_r($_POST,true));
	// }
}
// else{
//      $directorydata_Select = "SELECT `DirectoryID`  from `directorydata` where `DomainName` = '".$strDomainName."' and `Source` = '".$_POST['source']."'and `UserName` = '".$_POST['username']."'and `DirName` = '".$_POST['dir']."'";
//      $rs = $mysqli->query($directorydata_Select);
//      $data = $rs->fetch_assoc();
//      $directoryID = $data['DirectoryID'] ;
// } 

//检查文件名是否重复
$FileName=$file['tmp_name'];
$PathInfo=pathinfo($file["name"]);  
$FileType=$PathInfo['extension'];   
$destination = $NewDir.'/'.time().rand(0,9999).".".$FileType;  
if (file_exists($destination)){  
    errorreturn('同名文件已经存在了', print_r($destination,true)); 
    exit;  
}  

//保存文件
if(!move_uploaded_file ($FileName, iconv("UTF-8","gbk",$destination))){  
    errorreturn('移动文件出错', print_r($FileName,true)); 
    exit;  
} 
$PathInfo=pathinfo($destination);
$url = str_replace($NewDir,$strDomainName."/",$destination);
$ImageName=$PathInfo['basename'];
$date = date('Y-m-d H:i:s',time());
$noFarmatSize = $file['size'];
$size = formatBytes($file['size']);
// $imageupload_ImageInsert = "insert into `sourcelist`(`SourceName`,`SourceCount`,`SourceSize`,`SourcePath`,`SourceDestination`,`UploadTime`) values(?,?,?,?,?,?)";
// $stmt = $mysqli->prepare($imageupload_ImageInsert);
// $stmt->bind_param("sissss",$sourcename,$sourcecount,$size,$url,$destination,date('Y-m-d H:i:s'));
// $stmt->execute();
// if ($mysqli->affected_rows == 0) {
//     errorreturn('数据库异常！', print_r($_POST,true));
// }
$imageupload_ImageInsert="insert into sourcelist(SourceName,SourceCount,SourceSize,SourcePath,SourceDestination,UploadTime) values(?,?,?,?,?,?)";
// if(!$stmt=$mysqli->prepare($simageupload_ImageInsertql)){
//     errorreturn('添加图片数据失败');
// }
$stmt = $mysqli->prepare($imageupload_ImageInsert);
$stmt->bind_param("sissss",$sourcename,$sourcecount,$size,$url,$destination,$date);
$stmt->execute();
$stmt->close();

echo json_encode(array('ret'=>0,'data'=> array('imageurl' => $url ,'destination'=>$destination, 'imagename'=>$ImageName , 'imagesize'=>$noFarmatSize ,
'sourcename'=>$_POST['sourcename'] , 'sourcecount'=>$_POST['sourcecount'])),JSON_UNESCAPED_SLASHES);


/*****************************
函数：ImageFormatCheck
输入参数：$uptypes限制的图片类型,$file图片文件$_FILES["uploadimage"]
输出：无

功能：检查图片大小，类型
******************************/
function ImageFormatCheck($UpTypes,$MAX_IMAGE_SIZE,$file){
    //检查文件大小   
    if($MAX_IMAGE_SIZE < $file["size"]){  
        errorreturn('文件太大', print_r($file["size"],true));  
        exit;  
    }  

    //检查文件类型
    $PathInfo=pathinfo($file["name"]);  
    $FileType=$PathInfo['extension'];
    if(!in_array($FileType, $UpTypes)){  
        errorreturn('文件类型不符', print_r($FileType,true));  
        exit;  
    }
}


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