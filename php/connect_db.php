<?php

   $host = 'localhost';
   $db   = 'your_database_name';
   $user = 'your_database_user';
   $pass = 'your_database_password';
   $cset = 'utf8';

   $dsn = "mysql:host=$host;dbname=$db;charset=$cset";

   $opt = array(PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'");

   $pdo = new PDO($dsn, $user, $pass, $opt);

?>