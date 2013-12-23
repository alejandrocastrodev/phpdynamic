<div id="top-menu" class="navbar navbar-inverse navbar-fixed-top top-menu-aux">
  <div class="navbar-inner">
	<div class="container">
	  <img class="settings-logo" src="<?=$rel_image; ?>gear.png" />
	  <ul class="nav" current-key="active">
		<li><a href="<?=$pb_site; ?>">Inicio</a></li>
		<li><a href="<?=$pb_site; ?>settings">Configuracion</a></li>
		<li><a href="<?=$pb_site; ?>acount">Cuenta</a></li>
		  <li class="dropdown">
	        <a href="void(0)" class="dropdown-toggle" data-toggle="dropdown">Development <b class="caret"></b></a>
	        <ul class="dropdown-menu top-submenu" current-key="current">
	          <li><a href="<?=$pb_site; ?>simple-test.php">Simple-Test</a></li>
	          <li><a href="<?=$pb_site; ?>less-compiler.php">Less-compiler</a></li>
	          <li><a href="">Current page</a></li>
	        </ul>
	      </li>
	  </ul>
	</div>
  </div>
</div><!-- /top-menu -->