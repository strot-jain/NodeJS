import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
console.log(process.cwd());
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

class Logger extends EventEmitter {
  constructor() {
    super();
    this.on('info', (message) => {
      this.writeLog('INFO', message);
    });

    this.on('warn', (message) => {
      this.writeLog('WARN', message);
    });
    this.on('error', (message) => {
      this.writeLog('ERROR', message);
      console.log('ALERT: ERROR detected! Check logs for details.');
    });
  }
  writeLog(level, message) {
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} =-> ${level} ${message}\n`;
    fs.appendFileSync(logFile, logLine, 'utf8');
  }
}
export default Logger;
