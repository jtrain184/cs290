"use strict";

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function (vector) {
    let sumX = this.x + vector.x;
    let sumY = this.y + vector.y;
    return new Vector(sumX, sumY);
};

Vector.prototype.minus = function (vector) {
    let sumX = this.x - vector.x;
    let sumY = this.y - vector.y;
    return new Vector(sumX, sumY);
};

Object.defineProperty(Vector.prototype, "length", {
    get: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
    }
});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);