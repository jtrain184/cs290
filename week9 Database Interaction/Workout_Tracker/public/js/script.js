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
				//updateTable(); 
			} 
			else {
				console.log("Error in network request: " + req.statusText);
			}});				
		req.send(null);         //no need to send additional data
		event.preventDefault(); //prevent the page from refreshing
	});
}