
//closes or opens the div and calls the update of scroll behavior
function toggle_feedback(){
	$("#feedback").slideToggle(function(){		
	    update_feedback();
	});
}


function update_feedback(){
	check_feedback_style();
	check_bottom_space(function(){$("#feedback").perfectScrollbar('update');});	
}

//checks the space under the panel when remove elements and moves it for disappear it 
function check_bottom_space(callback){
	if($("#fix-scroll").position().top < $("#feedback").height()){
		var space =  $("#feedback").height() - $("#fix-scroll").position().top;
		$("#feedback").stop().animate(
        {scrollTop: "-=" + space},
        500,
        callback
        );
	}	
}

//sets the style of feedback when it is empty
function check_feedback_style(){
	if($.trim($("#feedback-content").html()) == ''){
		if(!$("#feedback-frame").hasClass('feedback-empty')){
			$("#feedback-frame").addClass('feedback-empty');
		}
	}
	else{
		if($("#feedback-frame").hasClass('feedback-empty')){
			$("#feedback-frame").removeClass('feedback-empty');
		}
	}
}

//adds the content at div with 'feedback' id
function add_to_feedback(content){
	var feedback = document.getElementById('feedback-content');
	feedback.insertBefore(content, feedback.firstChild);
	update_feedback();
}

function notify(content, description, classN){	
	var outDiv = document.createElement('div');
	outDiv.className = classN;
    outDiv.innerHTML += "<button type='button' class='close' data-dismiss='alert'>×</button>";
    
	var inDiv = document.createElement('div');
	inDiv.className = 'displaceable';
    inDiv.appendChild(document.createTextNode(content));
    
	newanchor = document.createElement("a");
	newanchor.appendChild(inDiv);
	$( newanchor ).click(function(){
		alert('click');
	});
	
	outDiv.appendChild(newanchor);
    add_to_feedback(outDiv);
    var handler = slide_into_loop(newanchor, inDiv);    
	 
	//it listens at event triggered by bootstrap close button, 
    //turns of the slide behavior and update the scrollbar
    var remove_message = function (event) {
	    self.clearInterval(handler);
	    //it forces remove before to updating the feedback frame
	    $(event.target).remove();
	    update_feedback();
    };
	$( outDiv ).on('closed.bs.alert', remove_message);		
}

function slide_into_loop(bundle, content){
	var overflow = $(content).width() - $(bundle).width();	
	// it runs only if container is smaller than content
	if(overflow > 0){	
		var slide = function(){ 		
			 slide_into(bundle, content, overflow);
			
		};
		//it runs immediately	
		setTimeout(slide, 0);
		//it runs every specified interval
		var handler = self.setInterval(slide , overflow * 45 + 3000);
		return handler;
	}
	return null;
}

function slide_into(bundle, content, overflow){
    $( content ).animate(
        {left: "-=" + overflow},
        overflow * 40,
        function() {
            $( content ).animate(
                {left: "+=" + overflow},
                overflow * 5,
                function() {
                // Animation complete.
		        }
		    );
	    }
    );  
}
