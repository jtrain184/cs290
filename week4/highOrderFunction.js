function forEach(array, work) {
	for (var i = 0; i < array.length; i++){
		work(array[i]);
	}
}

testArray = [1,2,3]
testArray2 = [1,2,"3", "jiggles"];

forEach(testArray, console.log);
console.log("\n");
forEach(testArray2, console.log);