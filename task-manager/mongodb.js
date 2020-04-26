// CRUD

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to the database.');
	}
	const db = client.db(databaseName);

	// The code below is for inserting ONE document

	// db.collection('users').insertOne({
	// 	name: 'Donya',
	// 	age: 36
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert user.')
	// 	}
	// 	console.log(result.ops);
	// });

	// ===============

	// The code below is to insert many documents simultanously.

	// db.collection('users').insertMany([
	// 	{
	// 		name: 'Taghi',
	// 		age: 45
	// 	}, {
	// 		name: 'Naghi',
	// 		age: 38
	// 	}
	// ], (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert users.')
	// 	}
	// 	console.log(result.ops);
	// });

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