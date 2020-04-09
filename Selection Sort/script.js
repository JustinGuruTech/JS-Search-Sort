// list of unsorted numbers
let numbers = [14, 54, 23, 34, 35, 64, 75, 12, 90, 43];
let speed = 200;
let sortStep = 0;

document.getElementById("startButton").onclick = function() {
	sortSingleStep(sortStep);
	sortStep++;
 };

// element for copying
var element = document.getElementById("placeholder");

// set elements
for (index = 0; index < numbers.length; index++) {
	var newElement = element.cloneNode(true); // copy
  newElement.innerHTML = numbers[index]; // number
  newElement.id = index; // index as id
  console.log((Math.log(numbers[index])).toString());
  newElement.style.paddingTop = (Math.log(numbers[index]) * 4).toString() + "%";
	document.getElementById("elements").appendChild(newElement);
}

var button = document.getElementById("stepButton");
button.onclick = function () {
	sortSingleStep(sortStep);
  sortStep++;
};

// single step of sort
function sortSingleStep(startIndex) {

	// set comparison color
	document.getElementById(startIndex).className = "element compareToElement";

	// find lowest number
	let lowestNumIndex = startIndex;
  for (let i = startIndex + 1; i < numbers.length; i++) {
  
  	// wait between comparisons
  	(function (i) {
      setTimeout(function () {
      
      	// set comparing style
        document.getElementById(i).className = "element comparingElement";
        
        // found new minimum
        if (numbers[i] < numbers[lowestNumIndex]) {
        	if (lowestNumIndex != startIndex) {
          	document.getElementById(lowestNumIndex).className = "element";
          }
          lowestNumIndex = i;
          document.getElementById(i).className = "element minimumElement";
    		} 
        
        // not new minimum, set back to regular element style
        else {
        	// wait for next element to compare to change back
          setTimeout(function() {
            document.getElementById(i).className = "element";
          }, speed);
        }
        
        if (i == numbers.length - 1) {
        	swapElements(startIndex, lowestNumIndex);
        }
      
      }, speed*i);
    
    })(i); 
		document.getElementById(i).className = "element";
  	
  }
	
	
}

function swapElements(startIndex, lowestNumIndex) {
	console.log(startIndex);
  console.log(lowestNumIndex);
  // sanity check
  if (startIndex != lowestNumIndex) {
  	setTimeout(function () {
    
    	// swap numbers in list
      tempVal = numbers[startIndex];
      numbers[startIndex] = numbers[lowestNumIndex];
      numbers[lowestNumIndex] = tempVal;
      
      // store elements
      let startElement = document.getElementById(startIndex);
      let lowestElement = document.getElementById(lowestNumIndex);
      
      // update displays in classes
      startElement.className = "element minimumElement";
      lowestElement.className = "element compareToElement";
      
      // update numbers on display
      startElement.innerText = numbers[startIndex];
      lowestElement.innerText = numbers[lowestNumIndex];
      
      // swap heights
      let paddingTemp = startElement.style.paddingTop;
      startElement.style.paddingTop = lowestElement.style.paddingTop;
      lowestElement.style.paddingTop = paddingTemp;
      
    }, 700);
  }
  
  // reset display
  setTimeout(function () {
      document.getElementById(startIndex).className = "element";
      document.getElementById(lowestNumIndex).className = "element";
			button.click(); // move to next step
    }, 1400);
}




