describe("cross-browser expexted behaviors:", function() {
	
	var expected  = new Object(),
        callspy = jasmine.createSpy('callspy'),
	    returnFalse = function(){return false;},
	    returnTrue = function(){callspy(); return true;},
	    throwException = function(msg){ throw ("JasmineException" + (' - ' + msg || ''));}

	beforeEach(function() {
	    //DO-NOTHIG 
	});

    describe("|| simple circuit behavior", function() {

	  beforeEach(function() {
	    //DO-NOTHIG 
	  });

	  it("should return right element if first is false", function() {
	    expect(false || expected).toBe(expected);
	  });

	  it("should return right element if first is undefined", function() {
	    expect(undefined || expected).toBe(expected);
	  });

	  it("should invoke right function if first is undefined", function() {
	    expect(undefined || returnTrue()).toBe(true);
	   	expect(callspy).toHaveBeenCalled();
	  });
	  
	  it("should invoke right function if first is false", function() {
	    expect(false || returnTrue()).toBe(true);
	   	expect(callspy).toHaveBeenCalled();
	  });
	  
	  it("should not invoke right function if first is true", function() {
	    expect(true || throwException('do not call function')).toBe(true);	   	
	  });
	  
	  it("should not invoke right function if first is 1", function() {
	    expect(1 || throwException('do not call function')).toBe(1);	   	
	  });
	  
	});
	
	describe("| complette circuit behavior", function() {
			
	  beforeEach(function() {
	    //DO-NOTHIG
	  });

	  it("should return 0 (zero) if first is false", function() {
	    expect(false | expected).toBe(0);
	  });
	  
	  it("should return 0 (zero) if first is undefined", function() {
	    expect(undefined | expected).toBe(0);
	  });
	  
	  it("should invoke right function if first is true", function() {
	    expect(true | returnTrue()).toBe(1);
	   	expect(callspy).toHaveBeenCalled();
	  });
	
	});
	
	describe("&& simple circuit behavior", function() {

	  beforeEach(function() {
	    //DO-NOTHIG 
	  });

	  it("should return right element if first is true", function() {
	    expect(true && expected).toBe(expected);
	  });

	  it("should return right element if first is a element", function() {
	    expect(expected && expected).toBe(expected);
	  });

	  it("should invoke right function if first is true", function() {
	    expect(true && returnTrue()).toBe(true);
	   	expect(callspy).toHaveBeenCalled();
	  });
	  
	  it("should invoke right function if first is 1", function() {
	    expect(1 && returnTrue()).toBe(true);
	   	expect(callspy).toHaveBeenCalled();
	  });
	  
	  it("should not invoke right function if first is false", function() {
	    expect(false && throwException('do not call function')).toBe(false);	   	
	  });
	  
	  it("should not invoke right function if first is undefined", function() {
	    expect(undefined && throwException('do not call function')).toBe(undefined);	   	
	  });
	  
	});
	
	describe("& complette circuit behavior", function() {
			
	  beforeEach(function() {
	    //DO-NOTHIG
	  });

	  it("should return zero if first is undefined", function() {
	    expect(undefined & expected).toBe(0);
	    //expect(undefined & expected).toBeTruthy();
	  });

	  it("should return zero if first is false and last is a element", function() {
	    expect(false & expected).toBe(0);
	  });
	  
	  it("should return zero if first and last are false", function() {
	    expect(false & false).toBe(0);
	  });

	  it("should invoke right function if first is false", function() {
	    expect(false & returnTrue()).toBe(0);
	   	expect(callspy).toHaveBeenCalled();
	  });

	});
	
	describe("Scope and effects", function() {
		
	  function modifies_param_to_cero(param){
	  	param = 0;	  	
	  }
	  
	  function return_param_as_cero(param){
	  	param = 0;
	  	return param;
	  }
			
	  beforeEach(function() {
	    //DO-NOTHIG
	  });

	  it("should not modify the reference of a param", function() {
	  	var number = 1;
	  	modifies_param_to_cero(number);
	    expect(number).toBe(1);
	  });
	  
	  it("should return a different value if modifies the param", function() {
	  	var number = 1;
	  	var anotherNumber = return_param_as_cero(number);
	    expect(anotherNumber).toBe(0);
	  });
	});
	
	
});