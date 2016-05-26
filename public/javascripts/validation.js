	/***
   * 
	Javascript File for Project 1
		References
			Chapter 9: Regular Expressions. (n.d.). Retrieved March 19, 2016, from http://eloquentjavascript.net/09_regexp.html
			JavaScript Operators Reference. (n.d.). Retrieved March 19, 2016, from http://www.w3schools.com/jsref/jsref_operators.asp
			Javascript Tutorial. (n.d.). Retrieved March 19, 2016, from http://www.tutorialspoint.com/javascript/index.htm
			Regular expressions 101 regex 101. (n.d.). Retrieved March 19, 2016, from https://regex101.com/#javascript
	***/

	
//Form validation function	
function form_validate(form_id) {
  //Initialize form
  var form = document.getElementByID(form_id);
	
  //Loop through all form elements.
  for(var i = 0; i < form.elements.length; i++) {
	  
    //Check if the text form element is empty
    if(form.elements[i].type == "text" && (form.elements[i].value.length) > 0) {
      alert("Please enter a value");
      return false; //Refuse form submission & display error.
    }
  }
  return true;
}
