const fs = require('fs');
const path = require('path');

// Function to merge multiple text files into one
function mergeTextFiles(inputFiles, outputFile) {
  try {
    const mergedContent = inputFiles
      .map((inputFile) => fs.readFileSync(inputFile, 'utf-8'))
      .join('\n'); // You can specify a delimiter if needed (e.g., '\n' for new lines)

    fs.writeFileSync(outputFile, mergedContent, 'utf-8');
    console.log(`Merged files into ${outputFile}`);
  } catch (error) {
    console.error('Error merging files:', error);
  }
}

// Define the input files to merge
const inputFiles = [
  path.join(__dirname, 'Found-Images', 'found_images_cbse.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_ibps.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_icse.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_neet_jee_fou.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_neet_jee.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_olympiad.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_ssc.txt'),
  path.join(__dirname, 'Found-Images', 'found_images_upsc.txt'),
];

// Define the output file where merged content will be saved
const outputFile = path.join(__dirname, 'Found-Images', 'allFoundImages.txt');

// Call the function to merge the files
mergeTextFiles(inputFiles, outputFile);
