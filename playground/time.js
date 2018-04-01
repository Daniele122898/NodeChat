//Listening to Time from inception to play with time cuz that's how hardcore i am
//Jan 1st 1970 00:00:00 am
const moment = require("moment");

/*
let dateOld = new Date();
console.log(dateOld);
*/
let createdAt = new Date().getTime();
let createdAtEqual = moment().valueOf();
let date = moment(createdAt);
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));