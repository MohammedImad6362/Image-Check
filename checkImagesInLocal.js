const fs = require('fs');
const path = require('path');

// Function to extract image names from the text file
function extractImageNames(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const regex = /Image '([^']+)' does not exist in S3\./g;
    const imageNames = [];
    let match;
    while ((match = regex.exec(data))) {
      imageNames.push(match[1]);
    }
    return imageNames;
  } catch (error) {
    console.error('Error reading the file:', error);
    return [];
  }
}

// Function to search for images in a folder (including subfolders)
function searchImagesInFolder(imageFolder, imageNames) {
  try {
    const foundImages = [];

    function searchRecursively(currentFolder) {
      const filesInFolder = fs.readdirSync(currentFolder);

      for (const fileName of filesInFolder) {
        const filePath = path.join(currentFolder, fileName);
        if (fs.statSync(filePath).isDirectory()) {
          // If it's a directory, search recursively
          searchRecursively(filePath);
        } else if (imageNames.includes(fileName)) {
          // If it's a file and the filename matches, add it to foundImages
          foundImages.push(fileName);
        }
      }
    }

    searchRecursively(imageFolder);

    return foundImages;
  } catch (error) {
    console.error('Error reading the image folder:', error);
    return [];
  }
}

// Function to write image names to a .txt file
function writeImagesToFile(imageNames, outputFilePath) {
  try {
    fs.writeFileSync(outputFilePath, imageNames.join('\n'), 'utf-8');
    console.log(`Image names written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

const textFilePath = path.join(__dirname, 'txt files', 'upsc', 'images_not_exist_upsc.txt');
const imageFolder = path.join(__dirname, 'ImageAssets');
const missingImagesOutputFilePath = path.join(__dirname, 'Missing-Images', 'missing_images_upsc.txt'); // Define the output file path for missing images
const foundImagesOutputFilePath = path.join(__dirname, 'Found-Images', 'found_images_upsc.txt'); // Define the output file path for found images

const imageNames = extractImageNames(textFilePath);
const foundImages = searchImagesInFolder(imageFolder, imageNames);

const missingImages = imageNames.filter((imageName) => !foundImages.includes(imageName));

writeImagesToFile(foundImages, foundImagesOutputFilePath);
writeImagesToFile(missingImages, missingImagesOutputFilePath);
