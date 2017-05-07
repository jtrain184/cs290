/*
Philip Jarrett
CS 290 HW Assignment: DOM and Events
Purpose:  Use pure JavaScript build a table with cells that can be "navigated" and
marked yellow using buttons and DOM navigation.
*/
function buildTable() {
    var table = document.createElement("table");
   
    //Create headings
    var headings = document.createElement("tr");
    for (var i = 1; i <= 4; i++){
        var headCell = document.createElement("th");
        headCell.textContent = "Header " + i;
        headings.appendChild(headCell);
    }
    table.appendChild(headings);

    //Create other cells
    for (var i = 1; i <=4; i++){
    	var row = document.createElement("tr");
    	for(var j = 1; j<=4; j++){
    		var cell = document.createElement("td");
    		cell.textContent = j + ", " + i;
    		cell.id = cell.textContent;
    		cell.setAttribute("col", j)
    		cell.setAttribute("row", i)
    		row.appendChild(cell);
    	}
    	table.appendChild(row);
    }
    return table;
}

//Add table to page, select top left cell
document.body.appendChild(buildTable());
var topLeft = document.getElementById("1, 1");
topLeft.className= "selected";

//Create buttons
function createButton(name) {
    var button = document.createElement("button");
    button.textContent = name;
    button.id = name;
    document.body.appendChild(button);
}

createButton("Up");
createButton("Down");
createButton("Left");
createButton("Right");
createButton("Mark Cell");


//Handle click events for movement
document.getElementById("Up").addEventListener("click", function(e){
    var currentSelection = document.getElementsByClassName("selected")[0];
    var currentRow = Number(currentSelection.getAttribute("row"));
    var currentCol = Number(currentSelection.getAttribute("col"));
    var newRow = currentRow - 1;
    var newSelection = document.getElementById(String(currentCol) + ", " + String(newRow));
    if(newSelection != null){
    	newSelection.className = "selected";
    	currentSelection.classList.remove("selected");
    }
});

document.getElementById("Down").addEventListener("click", function(e){
    var currentSelection = document.getElementsByClassName("selected")[0];
    var currentRow = Number(currentSelection.getAttribute("row"));
    var currentCol = Number(currentSelection.getAttribute("col"));
    var newRow = currentRow + 1;
    var newSelection = document.getElementById(String(currentCol) + ", " + String(newRow));
    if(newSelection != null){
    	newSelection.className = "selected";
    	currentSelection.classList.remove("selected");
    }
});

document.getElementById("Right").addEventListener("click", function(e){
    var currentSelection = document.getElementsByClassName("selected")[0];
    var currentRow = Number(currentSelection.getAttribute("row"));
    var currentCol = Number(currentSelection.getAttribute("col"));
    var newCol = currentCol + 1;
    var newSelection = document.getElementById(String(newCol) + ", " + String(currentRow));
    if(newSelection != null){
    	newSelection.className = "selected";
    	currentSelection.classList.remove("selected");
    }
});

document.getElementById("Left").addEventListener("click", function(e){
    var currentSelection = document.getElementsByClassName("selected")[0];
    var currentRow = Number(currentSelection.getAttribute("row"));
    var currentCol = Number(currentSelection.getAttribute("col"));
    var newCol = currentCol - 1;
    var newSelection = document.getElementById(String(newCol) + ", " + String(currentRow));
    if(newSelection != null){
    	newSelection.className = "selected";
    	currentSelection.classList.remove("selected");
    }
});

//Handle click event for marking cells
document.getElementById("Mark Cell").addEventListener("click", function(e){
    var currentSelection = document.getElementsByClassName("selected")[0];
    currentSelection.style.backgroundColor = "yellow";
});
