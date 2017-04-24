//Hoisting, works

hello();

function hello(){
	console.log("Hello");
}

//Without hoisting, won't work
try{
    hello2();	
}

catch(e) {
    console.log("Error: " + e.message);
}

var hello2 = function() {
	console.log("Hello, without hoist");
}

