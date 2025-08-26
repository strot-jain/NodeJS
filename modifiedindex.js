import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const filePath = path.join('./Test.Json');
console.log(filePath);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next(); 
});
const dataRouter = express.Router();
dataRouter.get('/', (req, res) => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    res.status(200).json(jsonData);
  } catch (err) {
    res.status(500).send('Error reading file');
  }
});

dataRouter.post('/', (req, res) => {
  const parsedData = req.body; 
  try {
    fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');
    res.status(200).send('Data written successfully');
  } catch (err) {
    res.status(500).send('Error writing file');
  }
});
app.use('/data', dataRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
