// Write your "actions" router here!
const express = require('express');
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
	const { project_id, description, notes } = req.body;

	if (!project_id || !description || !notes) {
		res
			.status(400)
			.json({ message: 'Please provide description and notes for the post' });
	} else {
		Action.insert(req.body)
			.then(({ id }) => {
				return Action.get(id);
			})
			.then((action) => {
				res.json(action);
			})
			.catch(() => {
				res.status(500).json({
					message: 'There was an error while saving the action to the database',
				});
			});
	}
});

router.put('/:id', (req, res) => {
	//
});

router.delete('/:id', (req, res) => {
	//
});

module.exports = router;
