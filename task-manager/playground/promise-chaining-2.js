require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5ea78ea49d50c02f4c2424e6').then(task => {
// 	console.log(task);
// 	return Task.countDocuments({ completed: false });
// }).then(result => console.log(result)).catch(e => {
// 	console.log(e);
// });


const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
}

deleteTaskAndCount('5eab7312580164109255b89f').then(result => {
	console.log(result);
}).catch(e => console.log(e));