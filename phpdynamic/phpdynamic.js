/**
 * @author Alejandro David Castro
 */

var debug_mode = true;

//adds  the value of 'log' param at div with 'log-box' identifier. if dump == true then it print deeply
function log(log, dump){
	//if(debug_mode) $( "log" ).append(dump? JSON.stringify(log)+'<br/>' : log);
	if(debug_mode) console.log(dump? JSON.stringify(log)+'<br/>' : log);
}

//initializes the arrays in the cache
//is used to check that the same file is not loaded twice
var cache = {
  js:   [],
  css:  [],
  less: []
};



//initializes the loaders arrays
//is used to synchronize the loads of files
//and the execution of functions
var haltedcalls = [],
    loaders   = [];

//catches global errors and shows it in log tag
//these error should be logged to a file on the server
window.onerror = function(msg, url, linenumber){
  log('message: ' + msg + '<br/>');
  log('url: ' + url + '<br/>');
  log('linenumber: ' + linenumber + '<br/>');
}

//and runs the loader of the site
//waits for complete the application loading
$( document ).ready(function() {
  load_site();
});

//loads the entire site dynamically
function load_site(){
  load_layout('global', false);
  load_page('home');
}

function run_on_load(callback){
  haltedcalls.add(callback);
  run_sync_callbacks();
}

//check if there is function to run
function run_sync_callbacks(){
  if(loaders.isEmpty()){
  	log('loaders [' + loaders.length + ']');
  	run_callbacks(haltedcalls, true);
    haltedcalls = [];
  }
}

//loads body and head information
function load_page(page_name){
  var unlock = unlock_this('page-' + page_name);
  var location = page_location(page_name);
  $.post(location,
    function(data){
      //here process the response in the view
      //data is a php with layout name and content
	  var xml = parseXML( data );
      var layout_name = tag_value(xml, 'layout-name', 'default');
      var content_loader = (function(){      	
  	    replace_tag(xml, 'content');
  	    replace_title(tag_value(xml, 'title'));
  	    blend_head(xml);
  	    unlock();
      });
      load_layout(layout_name, true, content_loader);
    }
  );
}

//loads body and head information
function load_layout(layoutName, blendLayoutTag, callback){
  var location = layout_location(layoutName);
  $.post(location,
    function(data){
      //here process the response in the view
      //data is a php with body and content tags
  	  var xml = parseXML( data );
  	  if(blendLayoutTag) replace_tag(xml, 'layout');
  	  blend_head(xml);
      if(callback) callback();
    }
  );
}

//replaces tag from received xml to 
function replace_tag(parsedXml, tagName){
    var tag = $(parsedXml).find(tagName);
    $( tagName ).replaceWith(tag);
}

//replaces the text in the document title
function replace_title(title){
	document.title = title;
}

function blend_head(parsedXml){
  blend_entities(parsedXml, 'head css', load_css);
  blend_entities(parsedXml, 'head js', load_js);
}

//extracts the entity from the xml that corresponds to the selector,
//and replaces it on the page using the blender function
function blend_entities(parsedXml, selector, blender){
  $(parsedXml).find(selector).each(function(index){
	  blender($.trim($(this).text()));
  	}
  );
}

//returns the clean text of a tag
function tag_value(parsedXml, tagName, ifNone){
  var tagValue = $.trim($(parsedXml).find(tagName).text());
  return tagValue ? tagValue : ifNone;
}

//loads css file dynamicaly from the public folder
function load_css(fileName){
  load_css_from(style_location(fileName, '.css'));
}

//loads css files dynamicaly
//checks that it was not loaded previously
function load_css_from(fileLocation){
  if(cache.css.add(fileLocation)){
    var linkTag = document.createElement ("link");
    linkTag.href = fileLocation;
    linkTag.rel = "stylesheet";
    var head = document.getElementsByTagName ("head")[0];
    head.appendChild (linkTag);
  }
}

//builds the corresponding file paths
function style_location(file_name, ext){ return 'view/style/' + file_name + ext; }
function script_location(file_name){ return 'view/script/' + file_name + '.js'; }
function layout_location(layout_name){ return 'view/site/layout/' + layout_name + '.php'; }
function page_location(page_name){ return 'view/site/page/' + page_name + '.php'; }


//loads javascript file dynamicaly from the public folder
//callback is executed when the loading is finished
//isLoaded indicates if this was loaded without problems
function load_js(fileName, callbacks){
  var unlock = unlock_this('js-' + fileName);
  
  var notify = logLoad(fileName);
  
  var newCallbacks = callbacks ? callbacks : [];
  newCallbacks.push(notify);
  newCallbacks.push(unlock);
  
  load_js_from(script_location(fileName), newCallbacks);
}

function logLoad(fileName){
  return function(isLoaded){
  	if(!isLoaded) log('ERROR: ' + fileName + '<br/>');
    //log(isLoaded ? fileName + '<br/>' : fileName + ' error <br/>'); 
  };
}

//add a lock to the loaders array and returns a function that removes this
function unlock_this(description){
  var lock = new Object();
  loaders.add(lock);
  log('>> ' + "-".repeat(loaders.length) + description + ' [' + loaders.length + ']<br/>');
  return function(){
    loaders.remove(lock);
    log(' << ' + '-'.repeat(loaders.length) + description + ' [' + loaders.length + ']<br/>');
    run_sync_callbacks();
  };
}

//loads javascript files dynamicaly
//checks that it was not loaded previously
function load_js_from(fileLocation, callbacks){
  if(cache.js.add(fileLocation)){
  	var loader = $.getScript( fileLocation );
  	if(callbacks){
	  loader.done(function( script, textStatus ) {
	    run_callbacks(callbacks, true);
	  })
	  .fail(function( jqxhr, settings, exception ) {
	    run_callbacks(callbacks, false);
	  });
    }
  }
}

//invokes all functions in the array, passing 'success' as param 
function run_callbacks(callbacks, success){
  for (i = 0; i < callbacks.length; i++) {
    callbacks[i](success);
  }
}

