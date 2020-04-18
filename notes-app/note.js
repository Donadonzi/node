const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...';


const addNotes = (title, body) => {
	const notes = loadNotes()
	const duplicateNotes = notes.filter( note => note.title === title )

	if (duplicateNotes.length === 0) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse('New note added!'))
	} else {
		console.log(chalk.red.inverse('Note title already exists!'))
	}	
}

const removeNotes = title => {
	const notes = loadNotes()
	const remainedNotes = notes.filter( note => note.title !== title )
	
	if (remainedNotes.length === notes.length) {
		console.log(chalk.red.inverse('Title not found.'))
	} else {
		saveNotes(remainedNotes)
		console.log(chalk.green.inverse('This note was removed: ') + chalk.bgGreen(title))
	}
	
}

const saveNotes = notes => {
	const dataStr = JSON.stringify(notes)
	fs.writeFileSync('note.json', dataStr)
}

const loadNotes = () => {
	try {
		const dataJSON = fs.readFileSync('note.json').toString();
		return JSON.parse(dataJSON)
	} catch (e) {
		return [];
	}
}

module.exports = {
	getNotes: getNotes,
	addNotes: addNotes,
	removeNotes: removeNotes
}