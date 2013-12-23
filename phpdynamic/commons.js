/**
 * @author Alejandro Castro
 */

//uses JQuery API for checks if the element exist
Array.prototype.contains = function(elem){
  return $.inArray(elem, this) >= 0;
}

//adds the element to array if it does not exist
Array.prototype.add = function(elem){
  return ($.inArray(elem, this) < 0 ) ? this.push(elem) : false;
}

//removes the element from array if it exist
Array.prototype.remove = function(elem){
  var position = $.inArray(elem, this);
  return (position >= 0) ? this.splice(position,1) : false;
}

Array.prototype.isEmpty = function(){
  return this.length === 0;
}

String.prototype.repeat = function(amount){
  var res = '';
  for (var i=0; i < amount; i++) {
    res += this;
  };
  return res;
}

function url_param(name){
  return find_param(name, window.location.href);
}

function find_param(name, url){
  var result = new RegExp(name + "=([^&]*)", "i").exec(url);
  return result && unescape(result[1]) || undefined;
}

