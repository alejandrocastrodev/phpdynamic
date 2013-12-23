<?php
session_start();  
$project = "phpdynamic/";

 //process the current path and set global variables
include $_SERVER['DOCUMENT_ROOT']."/".$project."phpdynamic/context.php";
?>

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">    
    <meta name="description" content="PHPDynamic web framework">
    <meta name="author" content="Alejandro Castro">

    <!--meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /-->

    <title></title>
       
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <script>
        document.createElement('log');
        document.createElement('layout');
        document.createElement('content');
      </script>
    <![endif]-->

    <meta property="og:image" content="<?=$pb_image;?>favicon/favicon.png" />
    <link rel="shortcut icon" href="<?=$pb_image;?>favicon/favicon.ico" />
	
    <link href="<?=$pb_style;?>global.css" rel="stylesheet">

  </head>
  <body>
    <layout>
      <content>
      </content>
    </layout>
    <log>
    </log>
  </body>

  <?/*<!-- JQuery -->*/ ?>
  <?/*<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>*/ ?>
  <script type="text/javascript" src="phpdynamic/jquery.min.1.10.2.js"></script>

  <?/*<!-- PhpDynamic library -->*/ ?>
  <script src="phpdynamic/commons.js"></script>
  <script src="phpdynamic/debug.js"></script>
  <script src="phpdynamic/parsexml.js"></script>
  <script src="phpdynamic/phpdynamic.js"></script>

  <?/*<!-- loads a less client-side interpreter in runtime - don't work in IE -->*/ ?>
  <!--[if !IE]><!-->
    <script src="phpdynamic/less-1.4.1.min.js"  defer=true ></script>
  <!--<![endif]-->

</html>
