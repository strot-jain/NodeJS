const { User, sequelize } = require('./models');
const fs = require('fs');
const path = './data.json';
const users= JSON.parse(fs.readFileSync(path,"utf-8"));
// const users = [
//   { name: 'strot', email: 'strotjain11@gmail.com', role: 'Intern' },
//   { name: 'stuti', email: 'stutijain11@gmail.com', role: 'doctor' }
// ];

async function Initiate() {
  try {
    await sequelize.sync({force:false});
    
    console.log("Database synced ");

    for (let user of users) {
      await User.create(user);
      console.log(`Inserted: ${user.name}`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await sequelize.close();
  }
}

Initiate();
