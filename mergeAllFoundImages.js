const fs = require('fs');
const path = require('path');
const fse = require('fs-extra'); // For copying files

// Function to search for an image in the given directory and its subdirectories
function searchForImage(directory, imageName, destinationFolder) {
  try {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);

      if (fs.statSync(filePath).isDirectory()) {
        // If it's a directory, recursively search inside
        searchForImage(filePath, imageName, destinationFolder);
      } else if (file === imageName) {
        const destinationPath = path.join(destinationFolder, file);

        // Copy the image to the destination folder
        fse.copyFileSync(filePath, destinationPath);

        console.log(`Found and copied: ${file}`);
      }
    });
  } catch (err) {
    console.error('Error while searching for images:', err);
  }
}

// Define the paths and image names from the .txt file
const txtFilePath = path.join(__dirname, 'Found-Images', 'allFoundImages.txt');
const imageFolder = path.join(__dirname, 'ImageAssets'); 
const destinationFolder = path.join(__dirname, 'newFolder');

// console.log('Text File Path:', txtFilePath);
// console.log('Main Folder Path:', imageFolder);
// console.log('Destination Folder Path:', destinationFolder);

// Read the image names from the .txt file
fs.readFile(txtFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the .txt file:', err);
    return;
  }

  const imageNames = data.trim().split('\n').map((imageName) => imageName.trim()); // Split by newline and trim whitespace

  console.log('Searching for Images:', imageNames);

  // Check if the main folder and destination folder exist
  if (!fs.existsSync(imageFolder)) {
    console.error('Main folder does not exist:', imageFolder);
    return;
  }

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  // Start searching for the images
  imageNames.forEach((imageName) => {
    searchForImage(imageFolder, imageName, destinationFolder);
  });
});
