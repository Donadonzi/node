const users = [];

///////////////// ADD A USER ////////////////
const addUser = ({ id, username, room }) => {

	// Clean the data
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();

	// Validate the data
	if (!username || !room) {
		return {
			error: 'Username and room are rquired.'
		}
	}

	// Check for existing user
	const existingUser = users.find((user) => {
		return user.username === username && user.room === room;
	});

	// Validate username
	if (existingUser) {
		return {
			error: 'That username is already in use!'
		}
	}

	// Store user
	const user = { id, username, room };
	users.push(user);
	return { user };

}


///////////////// REMOVE A USER ////////////////
const removeUser = (id) => {
	const index = users.findIndex(user => {
		return user.id === id;
	});
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}


///////////////// FETCH A USER ////////////////
const getUser = (id) => {
	return users.find(user => user.id === id);
}


/////////// FETCH ALL USERS IN A ROOM ////////////
const getUsersInRoom = (room) => {
	return users.filter(user => user.room === room);
}


module.exports = {
	addUser,
	getUser,
	removeUser,
	getUsersInRoom
}



// addUser({
// 	id: 10,
// 	username: 'Donya',
// 	room: 'Home'
// });

// addUser({
// 	id: 20,
// 	username: 'Fati',
// 	room: 'Home'
// });

// addUser({
// 	id: 30,
// 	username: 'Fillette',
// 	room: 'Biroon'
// });

// console.log(users);
// console.log(getUser(30));

// console.log(getUsersInRoom('home'));

