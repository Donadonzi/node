const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

///////////////// CREATE /////////////////
router.post('/tasks', auth, async (req, res) => {
	const task = new Task({ ...req.body, owner: req.user._id });
	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

///////////////// READ /////////////////
router.get('/tasks', auth, async (req, res) => {
	try {
		// const tasks = await Task.find({ owner: req.user._id }); This works as well
		await req.user.populate('tasks').execPopulate();
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send();
	}
});


router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send()
	}
});

///////////////// UPDATE /////////////////
router.patch('/tasks/:id', auth, async (req, res) => {
	const allowedUpdates = ['description', 'completed'];
	const updates = Object.keys(req.body);
	const isAllowed = updates.every((item) => {
		return allowedUpdates.includes(item);
	});
	if (!isAllowed) {
		return res.status(400).send({ error: 'Invalid update!' });
	}
	try {
		// Refactored this to be able to use middlewares
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		updates.forEach(item => task[item] = req.body[item]);
		await task.save();
		res.send(task);
	}
	catch (e) {
		res.status(400).send();
	}
});

///////////////// DELETE /////////////////
router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	}
	catch (e) {
		res.status(500).send();
	}
});


module.exports = router;