<?php
/***********************
函数：Inc.php
输入：
输出：

功能：配置文件
************************/
//数据库配置
// define("LOCALHOST", "localhost");
// define("USERNAME", "root");
// define("PASSWORD", "linjiawei");
// define("DATABASE", "limsystem");

define("LOCALHOST", "bdm273834305.my3w.com");
define("USERNAME", "bdm273834305");
define("PASSWORD", "linjiawei");
define("DATABASE", "bdm273834305_db");
//转换前端的json
if(!empty($_SERVER['CONTENT_TYPE'])){
    $content_type_args = explode(';', $_SERVER['CONTENT_TYPE']);
    if ($content_type_args[0] == 'application/json'){
        $_POST = json_decode(file_get_contents('php://input'),true);
    }
}

?>