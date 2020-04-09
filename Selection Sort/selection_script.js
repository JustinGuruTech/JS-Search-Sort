// list of unsorted numbers

// set number of elements based on window width
width = window.innerWidth;
numElements = Math.floor(width / 46);
let numbers = []
for (i = 0; i < numElements; i++) {
  numbers.push(Math.floor(Math.random() * 99) + 1);
}

// sort variables
let speed = 100;
let sortStep = 0;
let running = false;

slider = document.getElementById("myRange");
speed = 200 - slider.value
slider.oninput = function() {
  speed = 200 - this.value
  document.getElementById("sliderValue").innerText = this.value;
};

let startButton = document.getElementById("startButton")

// start/stop sort on button press
startButton.onclick = function() {
  if (startButton.innerText == "Start Sort" || startButton.innerText == "Resume Sort") {
    running = true;
    startButton.innerText = "Pause Sort";
    sortSingleStep(sortStep);
    sortStep++;
  } else if (startButton.innerText == "Pause Sort") {
    running = false;
    startButton.innerText = "Pausing...";
  }
 };

 document

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
  button.isenable
};

// single step of sort
function sortSingleStep(startIndex) {
  if (running) {
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
	
	
}

function swapElements(startIndex, lowestNumIndex) {

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
        document.getElementById(lowestNumIndex).className = "element";
        if (running) {
          button.click(); // move to next step
        } else {
          startButton.innerText = "Resume Sort";
          document.getElementById(startIndex).className = "element minimumElement";
        }
      }, 1400);
}




