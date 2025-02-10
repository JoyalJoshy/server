const fs = require('fs');

module.exports = {
  writeFile: writeFile,
  readFile: readFile,
  readFolder: readFolder,
  addData: addData,
  createFolder: createFolder,
  deleteFile, deleteFile,
  renameFile, renameFile,
};

function writeFile(filePath, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileData + '\n', (err) => {
      if (err) {
        console.error('Error while creating file' + '$filePath');
        resolve(false);
      } else {
        console.log('File ' + '$filePath' + ' created successfully');
        resolve(true);
      }
    });
  });
}

function createFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        console.error('Error while creating file' + '$filePath');
        resolve(false);
      } else {
        console.log('File ' + '$filePath' + ' created successfully.');
        resolve(true);
      }
    });
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file ' + '$filePath');
        reject(err);
      } else {
        const regex = /<([^<>]+)>/g;
        const words = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          words.push(match[1]);
        }
        resolve(words);
      }
    });
  });
}

function checkFileExist(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function readFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const filenames = files.map(file => file.replace(/\.[^.]+$/, ''));
      resolve(filenames);
    });
  });
}

function addData(filePath, fileData) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, fileData, (err) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(true);
      }
    });
  });
}

function createFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folderPath, (err) => {
      console.log(folderPath);
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  })
}

function renameFile(oldFilePath, newFilePath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldFilePath, newFilePath).then((err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  });
}