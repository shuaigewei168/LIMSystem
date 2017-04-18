<?php
/***********************
函数：Inc.php
输入：
输出：

功能：配置文件
************************/
//数据库配置
if($_SERVER['SERVER_NAME'] == 'bxu2442270530.my3w.com'){
define("LOCALHOST", "bdm273834305.my3w.com");
define("USERNAME", "bdm273834305");
define("PASSWORD", "linjiawei");
define("DATABASE", "bdm273834305_db"); 
define('DomainName','http://bxu2442270530.my3w.com/LIMSystem/images/');
define('DomainNameRoot','http://bxu2442270530.my3w.com/LIMSystem/src'); 
}else{
define("LOCALHOST", "localhost");
define("USERNAME", "root");
define("PASSWORD", "linjiawei");
define("DATABASE", "limsystem");
define('DomainName','http://127.0.0.1/LIMSystem/images/');
define('DomainNameRoot','http://127.0.0.1/LIMSystem/src');
}

//转换前端的json
if(!empty($_SERVER['CONTENT_TYPE'])){
    $content_type_args = explode(';', $_SERVER['CONTENT_TYPE']);
    if ($content_type_args[0] == 'application/json'){
        $_POST = json_decode(file_get_contents('php://input'),true);
    }
}

?>