const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();


///////////////// CREATE /////////////////
router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

///////////////// LOGIN /////////////////
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	}
	catch (e) {
		res.status(400).send();
	}
});

///////////////// LOG OUT OF ONE SESSION /////////////////
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	}
	catch (e) {
		res.status(500).send();
	}
});

///////////////// LOG OUT OF ALL SESSION /////////////////
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	}
	catch (e) {
		res.status(500).send();
	}
});

///////////////// READ /////////////////
router.get('/users/me', auth, async (req, res) => {

	res.send(req.user);

	// We don't need this anymore cuz we are using that auth middleware, and it stores
	// the fetched user in request body
	// try {
	// 	const users = await User.find({});
	// 	res.send(users);
	// } catch (e) {
	// 	res.status(500).send();
	// }
});


// Removed this after changing the route for user profile as  /users/me
// So we don't need this anymore and we don't want /users/:id route to do anything

// router.get('/users/:id', async (req, res) => {
// 	const _id = req.params.id;
// 	try {
// 		const user = await User.findById(_id);
// 		if (!user) {
// 			return res.status(404).send('User not found');
// 		}
// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// });


///////////////// UPDATE /////////////////
router.patch('/users/me', auth, async (req, res) => {

	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const updates = Object.keys(req.body);
	const isAllowed = updates.every((item) => {
		return allowedUpdates.includes(item);
	});
	if (!isAllowed) {
		return res.status(400).send({ 'error': 'Invalid updates!' });
	}

	try {
		
		updates.forEach(item => req.user[item] = req.body[item]);
		await req.user.save();
		res.send(req.user);
	}
	catch (e) {
		res.status(400).send(e);
	}
});

///////////////// DELETE /////////////////
router.delete('/users/me', auth, async (req, res) => {
	try {
		// Replaced the code below with .remove() mongoose method,
		// and since we are using auth we already know that there is an authenticated user if this code is running
		// const user = await User.findByIdAndDelete(req.user._id);
		// if (!user) {
		// 	return res.status(404).send();
		// }
		await req.user.remove();
		res.send(req.user);
	}
	catch (e) {
		res.status(500).send();
	}
});




module.exports = router;
