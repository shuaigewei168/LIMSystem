<?php
/***********************
函数：Inc.php
输入：
输出：

功能：配置文件
************************/
//数据库配置
define("LOCALHOST", "localhost");
define("USERNAME", "root");
define("PASSWORD", "linjiawei");
define("DATABASE", "limsystem");

//转换前端的json
$content_type_args = explode(';', $_SERVER['CONTENT_TYPE']);
if ($content_type_args[0] == 'application/json'){
    $_POST = json_decode(file_get_contents('php://input'),true);
}


?>