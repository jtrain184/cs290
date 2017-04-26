"use strict";
function outer(){
    var n = 0;
    inner();
    return n;
}

function inner(){
    n += 1; //Throws an error, n is not in scope.
}

//outer();

function closureMaker(){
    let n = 0;
    var inner = function(){
        n +=1;
    };
    var outer = function(){
        inner();
        return n;
    };
    return outer;
}

var outerClosure = closureMaker();
console.log("Call 1: " + outerClosure()); //Call 1: 1
console.log("Call 2: " + outerClosure()); //Call 2: 2