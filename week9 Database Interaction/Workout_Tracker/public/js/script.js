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
		
		//Contruct a URL that sends a GET request to /insert with all of the necessary data
		var url = "http://flip2.engr.oregonstate.edu:" + port + "/insert?" + "name=" + payload.name + "&reps=" + payload.reps + "&weight=" + payload.weight + "&date=" + payload.date + "&lbs=" + payload.lbs; 
		
		//Make the call
		req.open("GET", url, false); 
		req.addEventListener('load',function(){
			//If the request status is valid, update the table with the new value
			if(req.status >= 200 && req.status < 400){
				console.log(req.responseText); 
				
				//Update the table
				getCurrentData();
			} 
			else {
				console.log("Error in network request: " + req.statusText);
			}});				
		req.send(null);         //no need to send additional data
		event.preventDefault(); //prevent the page from refreshing
	});
}

function getCurrentData(){
	var req = new XMLHttpRequest();
	req.open('GET', "http://flip2.engr.oregonstate.edu/:" + port + "/select", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		var response = JSON.parse(req.responseText); // This gives us the response as a variable
		buildTable(response); //Creates the table
	});
	req.send(); //Send the content
};

function buildTable(data){
    var workoutTable = getElementById("workouts");
    var fields = Object.keys(data[0]);
    data.forEach(function(object){
	    var row = document.createElement("tr");
	    fields.forEach(function(field){
		var cell = document.createElement("td");
	  	cell.textContent = object[field];
	  	if(typeof object[field] == "number")
	  		cell.style.textAlign = "right";
	  	row.appendChild(cell);
	    });
	    workoutTable.appendChild(row);
	});
}