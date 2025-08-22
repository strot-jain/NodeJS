const fs = require('fs');
const path = require('path')
const add = require('./operations/add')
const substract = require('./operations/substract')
const multiply = require('./operations/multiply')
const divide = require('./operations/divide');
const logintofile = require('./operations/logFile.js')
const script = process.argv;
// console.log(script);  // gives array for path to node script & arguments.
const operation = script[2];
const arg1 = script[3]-'0';
// console.log(typeof(arg1))
const arg2 = script[4]-'0';
// console.log(arg1)
let result;
try{
switch(operation){
    case 'add' : result = add(arg1,arg2); break;
    case 'substract' : result = substract(arg1,arg2); break;
    case 'multiply' : result = multiply(arg1,arg2); break;
    case 'divide' : result = divide(arg1,arg2); break;
    default : throw new Error("Invalid");
}
console.log(`The ${operation} operation of ${arg1} & ${arg2} is`,result); 
logintofile(operation,arg1,arg2,result);
}
catch(err){
    console.log("Invalid operation");
}

