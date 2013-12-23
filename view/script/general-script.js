
run_on_load(function(){
  $('#feedback').perfectScrollbar();
  update_feedback();
});

//set a current class in the links that redirect to the current page
//set_current_links();
function set_current_links(){
  var ul_items = document.getElementsByTagName("ul");
  for (var i = 0; i < ul_items.length; ++i){
 	var current_key = ul_items[i].getAttribute("current-key");
 	var li_items = getDirectChildrenByTagName(ul_items[i], "LI");
 	for (var j = 0; j < li_items.length; ++j) {
	  if(contains_current_link(li_items[j].children)){
		li_items[j].className += " " + current_key;
	  }
	}
  }
}

//returns true when the element conintains a link to the current page as firs child
function contains_current_link(children){
  for (var i = 0; i < children.length; ++i) {
	if(children[0].tagName == "A"){
	  return current_link(children[0]);
	}
  }
}

//return an array with the first level children that are named as tag_name
function getDirectChildrenByTagName(elem, tag_name){
  temp = [];
  for (var i = 0; i < elem.children.length; ++i) {
	if(elem.children[i].tagName == tag_name){
	  temp.push(elem.children[i]);
	}
  }
  return temp;
}

//obtains the text after '#' in url
function current_link(link){
  return (link.href.split('#')[0] == location.href.split('#')[0]);
}
