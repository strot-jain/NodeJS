import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import moment from 'moment';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
//console.log(import.meta.url); file:///Users/strotjain/Documents/calculator-2/scripts/getEmployees.js
const __dirname = path.dirname(__filename);
// var a = 9
async function fetchEmployees() {
  try {
   
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const { users } = await response.json();

    const employees = users.map((u) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      age: u.age,
      city: u.address ? u.address.city : null
    }));

    const outputDir = path.join(__dirname, '..', 'output');
    fs.mkdirSync(outputDir, { recursive: true });

    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filePath = path.join(outputDir, `employees-${timestamp}.json`);


    fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
    console.log(` Employee data saved: ${filePath}`);
  } catch (err) {
    console.error('Error fetching employees:', err.message || err);
    process.exitCode = 1;
  }
}

fetchEmployees();

