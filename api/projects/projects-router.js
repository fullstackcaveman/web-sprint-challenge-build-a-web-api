// Write your "projects" router here!
const express = require('express');
const {
	validateProjectId,
	validateProject,
} = require('../middleware/projectMiddleware');
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

router.get('/:id', validateProjectId, (req, res) => {
	res.json(req.project);
});

router.post('/', validateProject, (req, res) => {
	Project.insert(req.body)
		.then((project) => {
			res.json(project);
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error while saving the project to the database',
			});
		});
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
	const changes = req.body;

	Project.update(req.params.id, changes)
		.then(() => {
			return Project.get(req.project.id);
		})
		.then((project) => {
			if (project) {
				res.json(project);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The project information could not be modified' });
		});
});

router.delete('/:id', validateProjectId, (req, res) => {
	Project.remove(req.params.id).then(() => res.json(req.project));
});

router.get('/:id/actions', validateProjectId, (req, res) => {
	Project.getProjectActions(req.params.id)
		.then((actions) => {
			res.json(actions);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The actions information could not be retrieved' });
		});
});

module.exports = router;
