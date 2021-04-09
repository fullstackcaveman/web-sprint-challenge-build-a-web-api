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
	const { name, description } = req.body;

	if (!name || !description) {
		res
			.status(400)
			.json({ message: 'Please provide name and description for the project' });
	} else {
		Project.insert(req.body)
			.then(({ id }) => {
				return Project.get(id);
			})
			.then((project) => {
				res.json(project);
			})
			.catch(() => {
				res.status(500).json({
					message:
						'There was an error while saving the project to the database',
				});
			});
	}
});

router.put('/:id', (req, res) => {
	//
});

router.delete('/:id', async (req, res) => {
	try {
		const project = await Project.get(req.params.id);
		if (!project) {
			res
				.status(404)
				.json({ message: 'The project with the specified ID does not exist' });
		} else {
			await Project.remove(req.params.id);
			res.json(project);
		}
	} catch (err) {
		res.status(500).json({ message: 'The project could not be removed' });
	}
});

router.get('/:id/actions', (req, res) => {
	//
});

module.exports = router;
