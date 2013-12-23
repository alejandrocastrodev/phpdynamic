
function log_node(node){ //deprecated
  log('nodetype:'  + node.nodeType  + ' <br/>');
  log('nodeName:'  + node.nodeName  + ' <br/>');
  log('nodeTag:'   + node.tagName   + ' <br/>');
  log('nodeValue:' + node.nodeValue + ' <br/>');
  log('nodeclass:'  + $(node).attr('name') + ' <br/>');
  log('nodeText:'  + $(node).text() + ' <br/>');  
}

//parses the received xml depends on browser
function parseXML(data){
  if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
  	//explorer parser
    var parsedXml = new window.ActiveXObject("Microsoft.XMLDOM");
    parsedXml.async = "false";
    parsedXml.loadXML(data);
    return xml2HTML(parsedXml);
  } else {
  	//default JQuery behavior
    return xml2HTML($.parseXML( data ));
  }
}

//parses xml tree into html - it is impossible replace xml nodes by html nodes in IE
function xml2HTML(node) {
  if(node.nodeType===3){ //TEXT_NODE
  	//Create a textNode element from text of xml element
  	return document.createTextNode(node.nodeValue);
  }
  if(node.nodeType===1) { //ELEMENT_NODE
    // Create HTML element from XML element.
    var elem = document.createElement(node.tagName);
    // Copy attributes
    for (var attri= node.attributes.length; attri-->0;) {
      var attr= node.attributes[attri];
      elem.setAttribute(attr.name, attr.value);
    }
  	try{
      // Copy element contents
      for (var child = node.firstChild; child !== null ; child = child.nextSibling){
	    elem.appendChild(xml2HTML(child));
      }
	}
	catch(e){
	  log("error on xml parsing: <br/>");
	  log(e, true);
	  log_node(node);
	}
    return elem;
  }
  if(node.nodeType===8){ //COMMENT_NODE
  	var comment = document.createComment('comment');
  	return comment;
  }
  if(node.nodeType===9){ //ROOT_NODE
  	//returns the first element in the document
  	return xml2HTML(node.firstChild);
  }
  //Error in file
  var errorP = document.createElement('p');
  errorP.appendChild(document.createTextNode('An error has been occurred in parsing xml'));
  return errorP;
}
