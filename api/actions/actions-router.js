// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Action = require('./actions-model');

router.get('/', (req, res) => {
	// Action.
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	Action.get(id)
		.then((action) => {
			if (action) {
				res.json(action);
			} else {
				res.status(404).json(`Action with id of ${id} not found`);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The action information could not be retrieved' });
		});
});

router.post('/', (req, res) => {
	//
});

router.put('/:id', (req, res) => {
	//
});

router.delete('/:id', (req, res) => {
	//
});

module.exports = router;
