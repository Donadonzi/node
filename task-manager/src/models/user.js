const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
		unique: true,
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



/////// A method for user login /////////
userSchema.statics.findByCredentials = async (email, password) => {

	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login!');
	}

	const isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) {
		throw new Error('Unable to login!');
	}

	return user;
}

/////// Hash the plain text password before saving /////////
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});



/////// Making the model /////////
/////// THIS HAS TO BE STATED HERE AT THE BOTTOM AFTER THOSE CODE ABOVE or the app won't work properly.
/////// It drove me crazy till I found out what the hell was wrong!! /////////
const User = mongoose.model('User', userSchema);

module.exports = User;



// raveshe avalie ke we used.
// Masalan intori user jadid misazim ba estefade az model.
// const don = new User({
// 	name: '   Shadi     ', email: '  shadi@GMAIL.COM', password: '  khar '
// });
// don.save().then(don => {
// 	console.log(don);
// }).catch(error => {
// 	console.log(error);
// });