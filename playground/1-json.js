const fs = require('fs')

const book = {
	title: 'A fraction of a whole',
	author: 'Steve Toltz'
}

const bookJSON = JSON.stringify(book)
// console.log(bookJSON) // This is a string. So we can't have such a thing as bookJSON.title masalan.

// const reversed = JSON.parse(bookJSON)
// console.log(reversed.title)
// console.log(reversed)

// fs.writeFileSync('1-json.json', book) -----> if I do this, this is gonna be written in the file:   [object Object]
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('../notes-app/note.txt')
// console.log(dataBuffer)

// const dataJSON = fs.readFileSync('1-json.json').toString();
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const dataStr = fs.readFileSync('1-json.json').toString();
const dataJSON = JSON.parse(dataStr);
dataJSON.name = 'Donya';
dataJSON.age = 36;
console.log(dataJSON)
fs.appendFileSync('1-json.json', JSON.stringify(dataJSON))
