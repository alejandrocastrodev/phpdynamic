/**
 * @author Desarrollo
 */


describe("commons:", function() {
	
  describe("Array prototype:", function() {
  	
  	var array, elem1, elem2;
  	beforeEach(function() {
	  array = [];
	  elem1 = "elem1";
	  elem2 = "elem2";
	});
  	
  	describe("contains:", function() {
	
	  beforeEach(function() {
	    //DO-NOTHING
	  });

	  it("should return true if the element already exists.", function() {
	  	array.add(elem1)
	    expect(array.contains(elem1)).toBe(true);
	  });
	  
	  it("should return false if the element do not exists.", function() {
	  	array.add(elem1)
	    expect(array.contains(elem2)).toBe(false);
	  });
	  
	});
	
    describe("add:", function() {
	
	  beforeEach(function() {
	    //DO-NOTHING
	  });

	  it("should add an element if do not exists.", function() {
	  	array.add(elem1);
	    expect(array.length).toEqual(1);
	  });	  

	  it("should add two different elements if do not exists.", function() {
	  	array.add(elem1);
	  	array.add(elem2);
	    expect(array.length).toEqual(2);
	  });

	  it("should not add an element twice if exists.", function() {
	  	array.add(elem1);
	  	array.add(elem1);
	    expect(array.length).toEqual(1);
	  });

	  it("should return true if the element do not exists.", function() {
	    expect(array.add(elem1)).toBeTruthy();
	  });

	});
	describe("remove:", function() {
		
	  beforeEach(function() {
	  });
	 
	  it("should remove an element if exist.", function() {  
	  	array.add(elem1);
	  	array.add(elem2);	
	  	array.remove(elem2);
	    expect(array.length).toEqual(1);
	  });
	  
	  it("should return ~true if removes one only element.", function() {
	  	array.add(elem1);
	  	expect(array.length).toEqual(1);
	    expect(array.remove(elem1)).toBeTruthy();
	  });
	  
	  it("should return ~false if the array is empty.", function() {
	  	expect(array.length).toEqual(0);
	    expect(array.remove(elem1)).toBeFalsy();
	  });
	});
	
	describe("isEmpty:", function() {
		
	  beforeEach(function() {
	  });

	  it("should return true if is empty.", function() {
	    expect(array.isEmpty()).toBe(true);
	  });
	  
	  it("should return false if is not empty.", function() {
	  	array.add(elem1);
	    expect(array.isEmpty()).toBe(false);
	  });
	  
	});
	
	
  });
  
  describe("String prototype:", function() {
  	
  	beforeEach(function() {
  		//DO-NOTHING
	});
  	
  	describe("repeat:", function() {
	
	  beforeEach(function() {
	    //DO-NOTHING
	  });

	  it("should return [SSS] if repeat 3 times [S].", function() {
	  	var expected = 'SSS';
	  	var actual = 'S'.repeat(3);
	    expect(actual).toBe(expected);
	  });
	  
	  it("should not return [sss] if repeat 3 times [S].", function() {
	  	var expected = 'sss';
	  	var actual = 'S'.repeat(3);
	    expect(actual).not.toBe(expected);
	  });
	  	  
	});
	
  });
  
  describe("Find param:", function() {
  	
  	beforeEach(function() {
  		//DO-NOTHING
	});
  	describe("Happy path:", function() {  
	  it("should return 'thename' as value of 'name' in '/home?name=thename&id=12'.", function() {
	    var expected = 'thename';
	    var actual = find_param('name', '/home?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	  it("should return '12' as value of 'id' in '/home?name=thename&id=12'.", function() {
	    var expected = '12';
	    var actual = find_param('id', '/home?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	   it("should return undefined as value of 'unknow' in '/home?name=thename&id=12'.", function() {
	    var actual = find_param('unknow', '/home?name=thename&id=12');	  
	    expect(actual).toBe(undefined);
	  });
	}); 
	describe("Use of hashtag:", function() {
	  it("should return 'thename' as value of 'name' in '/home#?name=thename&id=12'.", function() {
	    var expected = 'thename';
	    var actual = find_param('name', '/home#?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	  it("should return '12' as value of 'id' in '/home#?name=thename&id=12'.", function() {
	    var expected = '12';
	    var actual = find_param('id', '/home#?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	}); 
	describe("Use of extensionfile:", function() {
	  it("should return 'thename' as value of 'name' in '/home.xml?name=thename&id=12'.", function() {
	    var expected = 'thename';
	    var actual = find_param('name', '/home.xml?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	  it("should return '12' as value of 'id' in '/home.xml?name=thename&id=12'.", function() {
	    var expected = '12';
	    var actual = find_param('id', '/home.xml?name=thename&id=12');	  
	    expect(actual).toBe(expected);
	  });
	}); 
	
  });

});



