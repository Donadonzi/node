const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User;


// Masalan intori user jadid misazim ba estefade az model.
// const don = new User({
// 	name: '   Shadi     ', email: '  shadi@GMAIL.COM', password: '  khar '
// });
// don.save().then(don => {
// 	console.log(don);
// }).catch(error => {
// 	console.log(error);
// });