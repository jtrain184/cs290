function deepEqual(value1, value2) {
	if (value1 === value2)
		return true;

	if (typeof(value1) != "object" || value1 == null || 
		typeof(value2) != "object" || value2 == null) {
        return false;
	}

    var value1PropCount = 0, value2PropCount = 0;

	for (var property in value1)
       value1PropCount += 1;

    for (var property in value2){
    	value2PropCount +=1;
    	//Recursive call
    	if (!(property in value1) || !deepEqual(value1[property], value2[property])) 
    		return false;
    }

    return value1PropCount == value2PropCount;
}


//Test

var testObject1 = {
	value1 : 10
}

var testObject2 = {
	value1 : 13
}

var testObject3 = null;

var testObject5 = {
    value1: 10
}

console.log(deepEqual(10, 10));
console.log(deepEqual(10, 11));
console.log(deepEqual(null, null));
console.log(deepEqual(testObject1, testObject2));
console.log(deepEqual(testObject1, testObject3));
var testObject4 = testObject1;
console.log(deepEqual(testObject1, testObject4));
console.log(deepEqual(testObject1, testObject5));