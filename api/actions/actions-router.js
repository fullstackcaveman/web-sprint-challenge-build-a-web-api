// Write your "actions" router here!
const express = require('express');

const router = express.Router();

const { validateId, validateData } = require('../middleware/middleware');
const Action = require('./actions-model');

// Middleware gets *-model name passed into it to control what is returned

// @desc   Fetch all actions
// @route  GET /api/actions
// @access Public
router.get('/', (req, res) => {
	Action.get()
		.then((action) => {
			res.json(action);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The action information could not be retrieved' });
		});
});

// @desc   Fetch single action
// @route  GET /api/actions/:id
// @access Public
router.get('/:id', validateId('action'), (req, res) => {
	res.json(req.action);
});

// @desc   Create an action
// @route  Post /api/actions
// @access Public
router.post('/', validateData('action'), (req, res) => {
	Action.insert(req.body)
		.then((action) => {
			res.json(action);
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error while saving the action to the database',
			});
		});
});

// @desc   Update an action
// @route  PUT /api/actions/:id
// @access Public
router.put('/:id', validateId('action'), validateData('action'), (req, res) => {
	const changes = req.body;

	Action.update(req.params.id, changes)
		.then(() => {
			return Action.get(req.action.id);
		})
		.then((action) => {
			if (action) {
				res.json(action);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The action information could not be modified' });
		});
});

// @desc   Delete action
// @route  DELETE /api/actions/:id
// @access Public
router.delete('/:id', validateId('action'), (req, res) => {
	Action.remove(req.params.id).then(() => res.json(req.action));
});

module.exports = router;
