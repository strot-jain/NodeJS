import { readFile } from 'fs/promises';

async function read(path) {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

export default read;
