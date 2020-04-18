// const fs = require('fs') // You can name it whatever you want
// fs.writeFileSync('note.txt', 'This file was created using Node.js!')
// fs.appendFileSync('note.txt', ' And this line was appended later!')


const note = require('./note');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs')

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
// console.log(process.argv);
// console.log(process.argv[2]);


/* ============== USING yargs ===================== */

// Customize yargs version
// yargs.version('1.1.0')


// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note description',
			demandOption: true,
			type: 'string'
		}	
	},
	handler(argv) {
		// console.log(chalk.green('Adding a new note with the title: ') + chalk.red(argv.title) + ' It is about ' + chalk.blue(argv.body))
		note.addNotes(argv.title, argv.body)
	}
})

// Create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		note.removeNotes(argv.title)
	}
})

// Create list command
yargs.command({
	command: 'list',
	describe: 'Lists the existing notes',
	handler() {
		note.listNotes()
	}
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		note.readNote(argv.title)
	}
})


// This is needed for running the program. But if we want we can use yargs.parse instead.
// console.log(yargs.argv)

yargs.parse() 

