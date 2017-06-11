document.addEventListener('DOMContentLoaded', bindButtons);

var port = "12037";

function bindButtons(){
	//Add Value Function:
	document.getElementById('add').addEventListener('click', function(event) {
		//Create a new HTTP request
		var req = new XMLHttpRequest();  
        var payload = {};

		//Get form data
		payload.name = document.getElementById('name').value; 
		payload.reps = document.getElementById('reps').value;  
		payload.weight = document.getElementById('weight').value; 
		payload.date = document.getElementById('date').value; 
		payload.lbs = document.getElementById('lbs').value; 
		
		if(payload.name != ""){
		//Url for GET request
		var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert?" + "name=" + payload.name + "&reps=" + payload.reps + "&weight=" + payload.weight + "&date=" + payload.date + "&lbs=" + payload.lbs; 
		
	    //Make request
		req.open("GET", url, false); 
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				//Update table
				clearTable(); 
				getCurrentData();
			} 
			else {
				console.log("Error in network request: " + req.statusText);
			}});				
		req.send(null);         //no need to send additional data
		event.preventDefault(); //prevent the page from refreshing
	    }
	    else {
	    	var inputError = document.getElementById("error-output");
	    	inputError.innerText = "Input a name please";
            event.preventDefault();
	    }
	});
}

function getCurrentData(){
	var req = new XMLHttpRequest();
	req.open('GET', "http://flip2.engr.oregonstate.edu:" + port + "/select", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		var response = JSON.parse(req.responseText); // This gives us the response as a variable
		buildTable(response); //Creates the table
	});
	req.send(); //Send the content
};

function buildTable(data){
	console.log("buildTable	called");
    
    var fields = Object.keys(data[0]);
    var workoutTable = document.getElementById("workouts");

    data.forEach(function(object){
	    var row = document.createElement("tr");
	    row.style.textAlign = "center";
	    fields.forEach(function(field){
		var cell = document.createElement("td");
	  	cell.textContent = object[field];
	  	console.log(field);
	  	if(field == "id")
	  		cell.style.display = "none";
	  	row.appendChild(cell);
	    });
	    // Delete button
	    var cell = document.createElement("td");
		var delButton = document.createElement("BUTTON");
		var text = document.createTextNode("Delete");
		delButton.appendChild(text);
		delButton.id = row.firstChild.textContent;
		console.log(delButton.id);
		delButton.onclick = function(x){
			return function(){
				deleteRow(x);
			};
		}(delButton.id);  
		cell.appendChild(delButton);
		row.appendChild(cell);
		
		//Edit button
		var cell = document.createElement("td");
		var editButton = document.createElement("BUTTON");
		var text = document.createTextNode("Edit");
		editButton.appendChild(text);
		editButton.id = row.firstChild.textContent;
		editButton.onclick = function(x){
			return function(){
				editRow(x);
			};
		}(editButton.id); 
		cell.appendChild(editButton);
		row.appendChild(cell);

	    workoutTable.appendChild(row);
	});
}

function deleteRow(x){
    console.log("Passed to deleteRow:" + x)
}

function editRow(x){
console.log("Passed to editRow:" + x)
}

function clearTable(){
	//Delete all but header row
	if (document.getElementById("workouts").rows.length > 1) {
		for (i = (document.getElementById("workouts").rows.length - 1); i > 0; i--) {
			document.getElementById("workouts").deleteRow(i);
		}
	}
}