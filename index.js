import fs from 'fs';
import path from 'path';
import moment from 'moment';
import read from './utils/Readfile.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsPath = path.join(__dirname, 'data', 'jobs.json');
const positionPath = path.join(__dirname, 'data', 'positions.json');
const technologyPath = path.join(__dirname, 'data', 'technologies.json');

async function main() {
  const jobsData = await read(jobsPath);
  const positions = await read(positionPath);
  const technologyData = await read(technologyPath);

  if (!jobsData || !positions || !technologyData) {
    console.error("One or more input files failed to load.");
    return;
  }

  function assignTechnology(job, techList) {
    const jobDescription = job.description.toLowerCase();
    return techList.filter(tech =>
      jobDescription.includes(tech.toLowerCase())
    );
  }

  function assignPriority(job) {
    const desc = job.description.toLowerCase();
    if (positions.Lead.some(skill => desc.includes(skill.toLowerCase()))) return "LEAD";
    if (positions.Senior.some(skill => desc.includes(skill.toLowerCase()))) return "SENIOR";
    if (positions.Associate.some(skill => desc.includes(skill.toLowerCase()))) return "JUNIOR";
    return "FRESHER";
  }

  const finalUpdatedJobs = jobsData.map(job => ({
    ...job,
    technologies: assignTechnology(job, technologyData),
    assignedRole: assignPriority(job)
  }));

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const datef = moment().format('DD-MM-YYYY_HH-mm-ss');
  const outputPath = path.join(outputDir, `${datef}->updatedJobs.json`);
  fs.writeFileSync(outputPath, JSON.stringify(finalUpdatedJobs, null, 2), 'utf-8');

  console.log('Updated jobs saved to:', outputPath);
}

main();
