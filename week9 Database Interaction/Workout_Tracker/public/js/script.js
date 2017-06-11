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

	var workoutTable = document.createElement("table");
	workoutTable.setAttribute('id','workouts');
	var tableWrapper = document.getElementById("table-wrapper");
	tableWrapper.appendChild(workoutTable);
    
    var fields = Object.keys(data[0]);
    var headers = ["name","reps","weight","date","Units (0=kg, 1=lbs)"];
    var headings = document.createElement("tr");
    headers.forEach(function(header){
        var headCell = document.createElement("th");
        headCell.textContent = header;
        headings.appendChild(headCell);
    });
    workoutTable.appendChild(headings);

    data.forEach(function(object){
	    var row = document.createElement("tr");
	    fields.forEach(function(field){
		var cell = document.createElement("td");
	  	cell.textContent = object[field];
	  	console.log(field);
	  	if(field == "id")
	  		cell.style.display = "none";
	  	row.appendChild(cell);
	    });
	    console.log(row);
	    workoutTable.appendChild(row);
	});
}

function clearTable(){
var table = document.getElementById('workouts');
	table.parentNode.removeChild(table); 
}