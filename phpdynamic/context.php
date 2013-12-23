<?php

    if(!isset($project)){
	    $project = "";
	}
    if(!isset($current_page)){
	    $current_page = "Default";
	}

	conf_rel_path();
		
	//sets the path between current location and root
	function conf_rel_path(){
		global $project, $rel_path;
		$current_path_array  = path_to_array(path_at_last_slash());
		$current_path_length = count($current_path_array);
		$project_array       = path_to_array($project);
		$project_length      = count($project_array);
		$rel_path_temp       = "";
				
		for($index = 0; $index < $current_path_length && $index < $project_length; $index++){
		    if(($current_path_array[$index] != $project_array[$index]) || ($index+1 == $project_length)){
				$rel_path_temp = str_repeat("../", $current_path_length - $index - 1);
			    break;
			}
		}				
					
		if(!isset($rel_path) || $rel_path_temp != $rel_path){
			$rel_path = $rel_path_temp;
		    set_rel_path();
		}
	}


	function set_rel_path(){
		global $rel_path, $root, $frame, $form, $pb_style, $project, $rel_image, $current_page, $pb_site, $xml, $pb_script;
        $root         = $_SERVER['DOCUMENT_ROOT']."/".$project;
	    $frame        = $root."view/site/frame/";
	    $form         = $root."view/site/form/";
		$pb_site      = $rel_path."view/site/";
		$pb_style     = $pb_site."style/";
		$pb_script    = $pb_site."script/";
		$rel_image    = "view/image/";
		$xml          = $pb_site."xml/";
	}

	function path_at_last_slash(){
	    return substr($_SERVER['PHP_SELF'], 1, strrpos($_SERVER['PHP_SELF'],'/'));
	}

	function path_to_array($path){
	    return preg_split('/[\/]+/', $path, NULL, PREG_SPLIT_NO_EMPTY);
	}
	
	
?>