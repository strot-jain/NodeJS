const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const { sequelize,Users } = require('./models');
 async function Initiate(){
    await sequelize.sync({force: true});
     const data =JSON.parse(fs.readFileSync('./data.json','utf-8'));
     console.log(data);
     for(let i=0;i<data.length;i++) {
        let name = data[i].name;
        let email = data[i].email;
        let role = data[i].role;
       await Users.create({name,email,role});
     }
 
    console.log("Strot DB Sync");
}
Initiate();









   


// async function main(){
//     await sequelize.sync({force: true});

// }
// main();