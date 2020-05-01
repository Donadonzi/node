require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate("5ea891e5f6f15b4088989b54", { age: 2 }).then(user => {
	console.log(user);
	return User.countDocuments({ age: 2 });
}).then(result => {
	console.log(result);
}).catch(e => console.log(e));