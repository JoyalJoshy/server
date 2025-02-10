const file = require('./file');
const encrypter = require('./tools');

module.exports = {
    createVerification: createVerification,
    checkVerification: checkVerification,
    createUser: createUser,
};

function createVerification(number) {
    const code = encrypter.generateRandomID(6);
    const content = ("<" + number + ">" + "<" + code + ">");
    const verification = 'databases/verification.txt';
    return new Promise((resolve, reject) => {
        file.writeFile(verification, content).then(result => {
            if (result) {
                resolve(true);
                console.log("Verification created successfully");
            }
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

function checkVerification(number, code) {
    const verification = 'databases/verification.txt';
    return new Promise((resolve, reject) => {
        file.readFile(verification).then(result => {
          if (result.length > 0) {
            var numberData = result[0];
            var codeData = result[1];
            if (number == numberData) {
              if (code == codeData) {
                checkUser(number).then(result2 => {
                  if (result2) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                }).catch(error => {
                  reject(error);
                });
              } else {
                resolve(false);
              }
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        }).catch(error => {
            reject(error);
        });
    });
}

function checkUser(number) {
    const users = 'databases/users.txt';
    return new Promise((resolve, reject) => {
      file.readFile(users).then(result => {
        if (result.length > 0) {
          const numberData = result[0];
          if (number == numberData) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }).catch(error => {
        reject(error);
      });
    });
}

function createUser(data) {
    const code = encrypter.generateRandomID(6);
    const users = 'databases/users.txt';
    const userFolder = 'users/' + code;
    const content1 = ("<" + data[0] + "><" + code + ">");
    const content2 = ("<" + data[0] + "><" + data[1] + ">");
    return new Promise((resolve, reject) => {
      file.writeFile(users, content1).then(result1 => {
        if (result1) {
          file.createFolder(userFolder).then(result2 => {
            if (result2) {
              file.writeFile(userFolder + "/data.txt", content2).then(result3 => {
                if (result3) {
                  resolve(true);
                }
              });
            }
          });
        } else {
          resolve(false);
        }
      }).catch(error => {
        reject(error);
      });
    });
}