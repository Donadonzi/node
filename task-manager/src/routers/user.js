const express = require('express');
const User = require('../models/user');

const router = new express.Router();


///////////////// CREATE /////////////////
router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

///////////////// READ /////////////////
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});


///////////////// UPDATE /////////////////
router.patch('/users/:id', async (req, res) => {

	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const updates = Object.keys(req.body);
	const isAllowed = updates.every((item) => {
		return allowedUpdates.includes(item);
	});
	if (!isAllowed) {
		return res.status(400).send({ 'error': 'Invalid updates!' });
	}
	const _id = req.params.id;
	try {
		const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
		if (!user) {
			return res.status(400).send();
		}
		res.send(user);
	}
	catch (e) {
		res.status(400).send(e);
	}
});

///////////////// DELETE /////////////////
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	}
	catch (e) {
		res.status(500).send();
	}
});


module.exports = router;
