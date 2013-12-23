<?php
  //redirects to the root path
  $project = "phpdynamic/";
  include $_SERVER['DOCUMENT_ROOT']."/".$project."phpdynamic/context.php"; //init context
  header('Location: '.$root);
?>
