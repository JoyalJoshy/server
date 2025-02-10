const authentication = require('./authentication');

module.exports = {
    runCommand: runCommand
};

function runCommand(command, data) {
    return new Promise((resolve, reject) => {
        if (command == "CreateVerify") {
            authentication.createVerification(data[0]).then(result => {
              if (result) {
                resolve("1");
              } else {
                resolve("0");
              }
            }).catch(error => {
                reject(error);
            });
        } else if (command == "CheckVerify") {
            authentication.checkVerification(data[0], data[1]).then(result => {
                if (result) {
                  resolve("1");
                } else {
                  resolve("0");
                }
            }).catch(error => {
                reject(error);
            });
        } else if (command == "CreateUser") {
            authentication.createUser(data).then(result => {
              if (result) {
                resolve("1");
              } else {
                resolve("0");
              }
            });
        }
    });
}