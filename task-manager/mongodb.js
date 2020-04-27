// CRUD

/* We can use destructuring instead of this
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
*/
// Destructuring:
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// This part was only for learning purposes. We usually don't build the id ourselves as mongodb does it automatically.
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

/* I am commenting out this part cuz it's for CREATE part. We are moving to READ part.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to the database.');
	}
	const db = client.db(databaseName);

	//========== The code below is for inserting ONE document ==========
	db.collection('users').insertOne({
		_id: id,
		name: 'Helen',
		age: 40
	}, (error, result) => {
		if (error) {
			return console.log('Unable to insert user.')
		}
		console.log(result.ops);
	});

	// ==========The code below is to insert many documents simultanously===========
	db.collection('users').insertMany([
		{
			name: 'Taghi',
			age: 45
		}, {
			name: 'Naghi',
			age: 38
		}
	], (error, result) => {
		if (error) {
			return console.log('Unable to insert users.')
		}
		console.log(result.ops);
	});

	db.collection('tasks').insertMany([
		{
			task: 'Buy groceries',
			completed: false
		}, {
			task: 'Do laundry',
			completed: true
		}, {
			task: 'Update resume',
			completed: false
		}
	], (error, result) => {
		if (error) {
			return console.log('Unable to insert tasks.');
		}
		console.log(result.ops);
	});
});
*/

// ******* READ *********** //

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
// 	if (error) {
// 		return console.log('Unable to connect to the database.')
// 	}
// 	const db = client.db(databaseName);

// 	// db.collection('users').findOne({ name: 'Donya' }, (error, user) => {
// 	// 	if (error) {
// 	// 		return console.log('Unable to fetch.');
// 	// 	}
// 	// 	console.log(user);
// 	// });

// 	// db.collection('users').find({ age: 36 }).toArray((error, users) => {
// 	// 	console.log(users);
// 	// });

// 	// db.collection('users').find({ age: 36 }).count((error, count) => {
// 	// 	console.log(count);
// 	// });

// 	db.collection('tasks').findOne({ _id: new ObjectID("5ea6204c30cbe23dd836b622") }, (error, task) => {
// 		if (error) {
// 			return console.log('Unable to fetch task.');
// 		}
// 		console.log(task);
// 	});

// 	db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
// 		console.log(tasks);
// 	});
// });


// ******* UPDATE *********** //
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to the database.')
	}
	const db = client.db(databaseName);


	// Updates ONE document
	db.collection('users').updateOne({
		_id: new ObjectID("5ea6229353c2b1390cca48c4")
	}, {
		// $set: {
		// 	age: 60
		// }
		$inc: {
			age: 5
		}
	}).then(result => {
		console.log(result.modifiedCount);
	}).catch(error => {
		console.log(error);
	})

	// Updates 	MORE THAN ONE documents
	db.collection('tasks').updateMany({ completed: false }, {
		$set: {
			completed: true
		}
	}).then(result => {
		console.log(result.modifiedCount);
	}).catch(error => {
		console.log(error);
	});

});