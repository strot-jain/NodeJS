import http from 'http';
import Logger from './logger.js';
import fs from 'fs';


const logger = new Logger();
const filePath = "./Test.Json";
logger.emit('info', 'Application started');
logger.emit('warn', 'Low disk space');
logger.emit('error', 'Unable to connect to database');

const server = http.createServer((req,res)=>{
  
    
 if(req.method == "GET" && req.url === '/data'){
      let data=JSON.parse(fs.readFileSync('./Test.Json','utf-8'));
    
      res.end(JSON.stringify(data));
 }
else if (req.method === 'POST' && req.url === '/data') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });
     console.log(body);
    req.on('end', () => {
      try {
      
        const parsedData = JSON.parse(body);
        console.log(body);
        fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');
        res.end('Data written successfully');
      } catch (err) {
        res.end('Invalid JSON');
      }
    });
  } 
  else {
   
    res.end('Not Found');
  }
});
server.listen(3000,()=>{
    console.log(`http://localhost:3000/`);
})
//





// const EventEmitter = require('events');
// let eventEmitter = new EventEmitter();

// eventEmitter.on("start",()=>{
//     console.log("Hello");
// })

// eventEmitter.emit('start');
// setTimeout(()=>{
//     console.log("Hello1")
// },0);
// setImmediate(()=>{
//     console.log("Hello2");
// })
// process.nextTick(()=>{
//     console.log("Hello3");
// })

// eventEmitter.once('foo', () => {
//   console.log("event occured");
// });
// eventEmitter.emit('foo');
// eventEmitter.emit('foo');

// const EventEmitter = require('node:events');
// class MyEmitter extends EventEmitter{};
// const ee1 = new MyEmitter();

// ee1.on('foo',()=>{
//   console.log('foo called');
// });

// ee1.on('bar',()=>{
//   console.log('bar called');
// });

// console.log(ee1.eventNames());
// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const filePath = path.join(__dirname, 'data.json'); // JSON file

// const server = http.createServer((req, res) => {
//   // GET API
//   if (req.method === 'GET' && req.url === '/data') {
//     try {
//       const fileData = fs.readFileSync(filePath, 'utf-8');
//       const jsonData = JSON.parse(fileData);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(jsonData));
//     } catch (err) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('Error reading file');
//     }
//   } 
//   // POST API
//   else if (req.method === 'POST' && req.url === '/data') {
//     let body = '';

//     req.on('data', chunk => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       try {
//         // Optional: parse to validate JSON
//         const parsedData = JSON.parse(body);
//         fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');

//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Data written successfully');
//       } catch (err) {
//         res.writeHead(400, { 'Content-Type': 'text/plain' });
//         res.end('Invalid JSON');
//       }
//     });
//   } 
//   // Handle other routes
//   else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//   }
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
