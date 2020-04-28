const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {   // We specify the database name in the URL
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number.');
			}
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Please provide a valid email address.')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password".');
			}
		}
	}
});

// const don = new User({
// 	name: '   Shadi     ', email: '  shadi@GMAIL.COM', password: '  khar '
// });
// don.save().then(don => {
// 	console.log(don);
// }).catch(error => {
// 	console.log(error);
// });

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const firstTask = new Task({
	// description: 'Build Azar\'s site'
	
}).save().then(result => console.log(result)).catch(error => console.log(error));