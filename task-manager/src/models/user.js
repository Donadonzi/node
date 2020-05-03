const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

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
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}],
	avatar: {
		type: Buffer
	}
},
	{
		timestamps: true   // to keep records of time of creation and modification on documents
	});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
});

/////// A method for hiding private data from the user /////////
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;

	return userObject;
}


/////// A method for getting a token /////////
userSchema.methods.generateAuthToken = async function () { // Shouldn't use arrow function for 'this' bingind stuff
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'SomeSecretForSignature');
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
}



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

/////// A middleware for hashing the plain text password before saving ///////// 
userSchema.pre('save', async function (next) {   // Shouldn't use arrow function for 'this' bingind stuff
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

/////// A middleware for deleting all tasks of a removed user ///////// 
userSchema.pre('remove', async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
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