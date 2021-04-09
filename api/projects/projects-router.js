// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Project = require('./projects-model');

router.get('/', (req, res) => {
	Project.get()
		.then((project) => {
			res.json(project);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The project information could not be retrieved' });
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	Project.get(id)
		.then((project) => {
			if (project) {
				res.json(project);
			} else {
				res.status(404).json(`Project with id of ${id} not found`);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The project information could not be retrieved' });
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

router.get('/:id/actions', (req, res) => {
	//
});

module.exports = router;
