//What is the result that is logged to the console after this code is executed?

function Car(make, drive){
  this.make = make;
  this.drive = drive;
}
var ford = new Car("focus","2wd");
ford.mpg = 20;
var honda = {model:"civic", drive:"2wd"};
honda.mpg = 15;

console.log(ford);