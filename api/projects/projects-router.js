// Write your "projects" router here!
const express = require('express');

const router = express.Router();

const { validateId, validateData } = require('../middleware/middleware');
const Project = require('./projects-model');

// Middleware gets *-model name passed into it to control what is returned

// @desc   Fetch all projects
// @route  GET /api/projects
// @access Public
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

// @desc   Fetch single project
// @route  GET /api/projects/:id
// @access Public
router.get('/:id', validateId('project'), (req, res) => {
	res.json(req.project);
});

// @desc   Create a project
// @route  Post /api/projects
// @access Public
router.post('/', validateData('project'), (req, res) => {
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

// @desc   Update a project
// @route  PUT /api/projects/:id
// @access Public
router.put(
	'/:id',
	validateId('project'),
	validateData('project'),
	(req, res) => {
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
	}
);

// @desc   Delete project
// @route  DELETE /api/projects/:id
// @access Public
router.delete('/:id', validateId('project'), (req, res) => {
	Project.remove(req.params.id).then(() => res.json(req.project));
});

// @desc   Fetch all project actions
// @route  GET /api/projects/:id/actions
// @access Public
router.get('/:id/actions', validateId('project'), (req, res) => {
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
