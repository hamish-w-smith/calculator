var entries = []; // Create an empty variable for entries array
var total = 0; //Create an empty variable for the returned total 

var temp = ''; // Create an empty variable to store temporary input

// $ = document.getElementById("button") get elements by id button
// on is a jQuery function - this returns a function when the attached element is clicked
// so when a button element is clicked the function below is called
$("button").on('click', function() {
 	var val = $(this).text(); //Grabs the text of the button

  // Got a number, add to temp
  if (!isNaN(val) || val === '.') { //if entry is not a symbol or decimal point
    temp += val;  //add to temporary 
    $("#answer").val(temp.substring(0,10)); //id='answer' is val(temp.substring(0,10)) adding number to temp string (more to research)
    
  // Got some symbol other than equals, add temp to our entries
  // then add our current symbol and clear temp
  } else if (val === 'AC') { //if entry is all clear
    entries = [];// clear entries
    temp = '';// clear temp
    total = 0;// clear total
    $("#answer").val('') //set id=answer to emptry string

  // Clear last entry
  } else if (val === 'CE') { // if input is CE
    temp = '';// clear temp
    $("#answer").val('')// clear answer
    
  // Change multiply symbol to work with eval
  } else if (val === 'x') {
    entries.push(temp); // if the time symbol is hit push the temp to entries
    entries.push('*'); // pushing times symbol to entries
    temp = ''; //sets temp to emptry string ready for new user input
    
  // Change divide symbol to work with eval
  } else if (val === '÷') { //same as x 
    entries.push(temp);
    entries.push('/');
    temp = '';

  // Got the equals sign, perform calculation
  } else if (val === '=') {
  	entries.push(temp); // pushes remaining user input over to entries

    var nt = Number(entries[0]); //define new var = entries position 1
    for (var i = 1; i < entries.length; i++) { // looping over the entries array
      var nextNum = Number(entries[i+1]) //converting entries position i+1
      var symbol = entries[i];// symbol is now the entries ith position
      
      if (symbol === '+') { nt += nextNum; } //if input is + it gets added to nextNum
      else if (symbol === '-') { nt -= nextNum; } 
      else if (symbol === '*') { nt *= nextNum; } 
      else if (symbol === '/') { nt /= nextNum; }
      
      i++; //adding to i
    }
    
    // Swap the '-' symbol so text input handles it correctly
    if (nt < 0) { //if the first number was a negative
      nt = Math.abs(nt) + '-';//absolute value to make positive then add '-'
    }
    
    $("#answer").val(nt); //displays the answer
		entries = [];// empty array
    temp = '';//empty temp
    
  // Push number
  } else {
    entries.push(temp);// add another number to entries array
    entries.push(val);// val displays input
    temp = '';// empty temp
  }
});