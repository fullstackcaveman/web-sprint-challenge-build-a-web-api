// Write your "actions" router here!
const express = require('express');
const {
	validateActionId,
	validateAction,
} = require('../middleware/actionMiddleware');
const router = express.Router();

const Action = require('./actions-model');

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

router.get('/:id', validateActionId, (req, res) => {
	res.json(req.action);
});

router.post('/', validateAction, (req, res) => {
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

router.put('/:id', validateActionId, validateAction, (req, res) => {
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

router.delete('/:id', validateActionId, (req, res) => {
	Action.remove(req.params.id).then(() => res.json(req.action));
});

module.exports = router;
