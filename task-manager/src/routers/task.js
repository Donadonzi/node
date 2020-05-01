const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

///////////////// CREATE /////////////////
router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

///////////////// READ /////////////////
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (e) {
		res.status(500).send();
	}
});


router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findById(_id);
		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.send(task);
	} catch (e) {
		res.status(500).send()
	}
});

///////////////// UPDATE /////////////////
router.patch('/tasks/:id', async (req, res) => {
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

		const task = await Task.findById(req.params.id);
		updates.forEach(item => task[item] = req.body[item]);
		await task.save();
		if (!task) {
			return res.status(400).send();
		}
		res.send(task);
	}
	catch (e) {
		res.status(400).send();
	}
});

///////////////// DELETE /////////////////
router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
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