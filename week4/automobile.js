function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using selection sort and an arbitrary comparator. Sorted in ascending order*/
function sortArr( comparator, array ){
    var result = [];
    var len = array.length, temp, maxIdx;
    for (var i = 0; i < len; i++){
        maxIdx = i;
        for (var j = i+1; j < len; j++){
            if(comparator(array[j], array[maxIdx])){
                maxIdx = j;
            }
        }
    temp = array[i];
    array[i] = array[maxIdx]
    array[maxIdx] = temp;
    }
    return array;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2) {
    if(auto1.make.toLowerCase() < auto2.make.toLowerCase()){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    var type1 = auto1.type.toLowerCase(), type2 = auto2.type.toLowerCase();
    if (type1 === type2){
       if(yearComparator(auto1, auto2)){
        return true;
       } else {
           return false;
       }
    }

    else if (type1 == "roadster"){
        return true;
    }

    else if (type1 == "pickup" && type2 != "roadster"){
        return true;
    }

    else if (type1 == "suv" && (type2 != "roadster" && type2 != "pickup")){
        return true;
    }

    else if (type1 == "wagon" && (type2 != "roadster" && type2 != "pickup" && type2 != "suv")){
        return true;
    }

    else {
        return false;
    }

}

Automobile.prototype.logMe = function logMe(boolVal)
{
    if (boolVal)
        console.log( this.year + "      " + this.make + "       " + this.model + "      " + this.type);
    else
        console.log( this.year + "       " + this.make + "      " + this.model);
};


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

console.log("*****");
console.log("The cars sorted by year are:");
var sortedByYear = sortArr(yearComparator, automobiles);
sortedByYear.forEach(function(automobile){
    automobile.logMe(false);
});

console.log();

console.log("The cars sorted by make are:");
var sortedByYear = sortArr(makeComparator, automobiles);
sortedByYear.forEach(function(automobile){
    automobile.logMe(false);
});

console.log();

console.log("The cars sorted by type are:");
var sortedByYear = sortArr(typeComparator, automobiles);
sortedByYear.forEach(function(automobile){
    automobile.logMe(true);
});

console.log("*****");
/* Tests
var exampleArray = [5, 60, 4, 9, 2, 54, 1, 2, 4, 3, 5, 292];
var sortedExample = sortArr(exComparator, exampleArray);
console.log(sortedExample);
//Test years
console.log(sortArr(yearComparator, automobiles));
*/