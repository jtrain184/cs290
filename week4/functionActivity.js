function sumArray (array) {
	var sum = 0;
	array.forEach(function(v) {
		sum += v;
	});
	return sum;
}

console.log(sumArray([2,4,6]));

function dialog(speaker) {
	return function(speech) {
		return speaker + " says \"" + speech + "\"";
	}
}



var Donald = {name: "Donald Duck"};
Donald.speak = dialog(Donald.name);
console.log(Donald.speak("Hello there"));