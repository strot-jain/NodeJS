import fs from 'fs';
import path from 'path';
const today = new Date();
import { fileURLToPath } from 'url';
// __dirname is not available in esm,so we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
const newfile = path.join(__dirname,'../storehouse.txt');
function logintofile(operation,a,b,result){

      const data = `${today.toISOString()} --> ${operation}(${a}, ${b}) = ${result}\n`;
      fs.appendFileSync(newfile,data,"utf8");
}
export default logintofile; 