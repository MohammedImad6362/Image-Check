const fs = require('fs');
const readline = require('readline');
const path = require('path')

// Replace 'yourfile.txt' with the path to your .txt file
const filePath = path.join(__dirname, 'Missing-Images', 'missing_images_upsc.txt')

const readStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity, // To handle both Unix and Windows line endings
});

let lineCount = 0;

rl.on('line', (line) => {
  lineCount++;
});

rl.on('close', () => {
  console.log(`Total lines in ${filePath}: ${lineCount}`);
});

rl.on('error', (err) => {
  console.error(`Error reading ${filePath}:`, err);
});
