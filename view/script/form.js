
function ckeck(checkElem){
	var checkboxes = checkElem.form.getElementsByTagName('input');
	for (var i=0; i<checkboxes.length; i++){
      if (checkboxes[i].type == 'checkbox'){
        checkboxes[i].checked = checkElem.checked;
      }
    }
}



