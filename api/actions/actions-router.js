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
	const { project_id, description, notes } = req.body;

	if (!project_id || !description || !notes) {
		res.status(400).json({
			message:
				'Please provide project id, description, and notes for the action',
		});
	} else {
		Action.get(req.params.id)
			.then((action) => {
				if (!action) {
					res.status(404).json({
						message: 'The action with the specified ID does not exist',
					});
				} else {
					return Action.update(req.params.id, req.body);
				}
			})
			.then((data) => {
				if (data) {
					return Action.get(req.params.id);
				}
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
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const action = await Action.get(req.params.id);
		if (!action) {
			res
				.status(404)
				.json({ message: 'The action with the specified ID does not exist' });
		} else {
			await Action.remove(req.params.id);
			res.json(action);
		}
	} catch (err) {
		res.status(500).json({ message: 'The action could not be removed' });
	}
});

module.exports = router;
