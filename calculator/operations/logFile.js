const fs = require('fs');
const path = require('path')
const today = new Date();
console.log(__dirname)
const newfile = path.join(__dirname,'../storehouse.txt');
function logintofile(operation,a,b,result){

      const data = `${today.toISOString()} ---->>>>> ${operation}(${a}, ${b}) = ${result}\n`;

      fs.appendFileSync(newfile,data,"utf8");
}
module.exports = logintofile; 