const mongoose = require('mongoose');


const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
});

module.exports = Task;



// Masalan intori user jadid misazim ba estefade az model.
// const firstTask = new Task({
// 	description: 'Build Azar\'s site'

// }).save().then(result => console.log(result)).catch(error => console.log(error));