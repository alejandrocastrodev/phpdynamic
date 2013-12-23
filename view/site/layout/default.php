<?php
session_start();  
$project = "phpdynamic/";
//process the current path and set global variables
include $_SERVER['DOCUMENT_ROOT']."/".$project."phpdynamic/context.php";

//this is the default layout
?>
<layout-root>
  <head>
    <css>bootstrap-responsive.min</css>
    <js>general-script</js>
    <js>perfect-scrollbar</js>
    <js>jquery.mousewheel</js>
    <js>feedback-panel</js>
  </head>
  <layout>
    <?php include $frame."top-menu.php";?>
	<?php include $frame."header.php";?>
	<div class="container-fluid">
	    <div id="main" class="row-fluid main">
	      <div class="span2">
		  <?php include $frame."actions.php";?>
	      <?php include $frame."feedback.php";?>
	      </div> <!-- /left-menu -->
	      <div id="content" class="span10 content pull-right">
    		<content>
    		</content>
    	  </div> <!-- /content -->
		</div> <!-- /main -->
		<div class="navbar navbar-fixed-bottom">
        </div>
	</div>
  </layout>
</layout-root>