// load the form content
$(document).ready(function(){        
        load_form_content();       
    });

//gets the files to compile and appends the view items
function load_form_content(){
	$.post('../blind/compile-less-files.php',
      function(data) {
      	//here process the response in the view
      	//data.model = [file1, file2]
      	var response = JSON.parse(data);
      	for(var indice=0; indice<response.length; indice++){
      	    add_content(response[indice]);
      	}
      });
}

//builds the items for the view and appends it
function add_content(file_name){
	
	var html_item = " \
	<div class='container-fluid' id='" + file_name + "'> \
	    <div class='span6 file-name'> \
	    	<p>" + file_name + "</p> \
	    </div> \
	    <div class='span1' > \
	      <input type='checkbox' value='" + file_name + "'/> \
	    </div> \
	    <div class='span1 compile-single'> \
	      <button type='button' class='btn btn-primary btn-mini' onclick=\"compile_less_unique('" + file_name + "');\">Compilar</button>  \
	    </div> \
    </div>";
    
	$('#less-form-items').append(html_item);
}

function compile_less_unique(file_name, button_e){
	
	$(button_e).attr("disabled", true);
	ajax_compile_less(cut_less_extension(file_name));
}

// it extracts the names from checkbox elems
function compile_less_selected(form){
	var checkboxes = form.getElementsByTagName('input');
	var names = [];
	for (var i=0; i<checkboxes.length; i++){
	  //avoid the checkbox used for check all 
	  //others in the view, it has a 'exclude' attribute
      if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked && !checkboxes[i].hasAttribute('exclude')){
        names.push(cut_less_extension(checkboxes[i].value));
      }
    }
    ajax_compile_less(names.join(','));
}


// it cuts the '.less' extension for send the name to server side
function cut_less_extension(file_name){
	return file_name.substr(0, file_name.length - 5);	
}


// it sends asynchronously the filenames to the server
function ajax_compile_less(file_name_s){
	$.post('../blind/compile-less.php', { files: file_name_s},
      function(data) {
      	//here process the response in the view
      	//data.model = [['done1', 'done2'],['undone1', 'undone2']]
      	var response = eval(data);
      	notify_all(response[0], 'compile-success', 'success-info');
      	notify_all(response[1], 'compile-error'  , 'error-info'  );
      });
}

//it notifies response depending if it is unique or multivalued
function notify_all(response_array, description, classN){
	if(response_array.length > 0){
		var procces = response_array[0];
		if(response_array.length > 1){
		    procces = response_array.join(" - ");
	    }
    notify(procces, description, classN);
    }
}



