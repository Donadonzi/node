// const fs = require('fs') // You can name it whatever you want
// fs.writeFileSync('note.txt', 'This file was created using Node.js!')
// fs.appendFileSync('note.txt', ' And this line was appended later!')


const getNotes = require('./note');
const validator = require('validator');
const chalk = require('chalk');

// console.log(getNotes());

/* ============== USING VALIDATOR LIBRARY =====================
// console.log(validator.isEmail('dfd@sdsd.dfd'));
// console.log(validator.isEmail('1343@fgsf.fsgfg'));
// console.log(validator.isEmail('dsfds@fgsf'));
// console.log(validator.isURL('www.google.com'));
// console.log(validator.isURL('http://google.com'));
// console.log(validator.isURL('google.com'));
// console.log(validator.isURL('google'));
*/

/* ============== USING CHALK LIBRARY =====================
console.log(chalk.green('Success!'));
console.log(chalk.magenta.bold('TEST'));
console.log(chalk.magenta.inverse('TEST'));
console.log(chalk.bgBlue('TEST'));
console.log(chalk.black.bgYellow('TEST'));
console.log(chalk.cyan.bold.underline('It\'s gonna be alright!'));
*/

/* ============== USING process.argv ===================== */
console.log(process.argv);
console.log(process.argv[2]);

