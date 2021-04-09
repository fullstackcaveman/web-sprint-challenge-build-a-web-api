const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

// Refactored both middleware files using 2 middleware functions each into 1 middleware file with 2 reusable functions

// Reusable Id validation
const validateId = (model) => async (req, res, next) => {
	const id = req.params.id;

	// If passed-in model is "action"
	if (model === 'action') {
		try {
			const action = await Actions.get(id);
			if (!action) {
				res.status(404).json(`Action with id of ${id} not found`);
			} else {
				req.action = action;
				next();
			}
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	// If passed-in model is "project"
	if (model === 'project') {
		try {
			const project = await Projects.get(id);
			if (!project) {
				res.status(404).json(`Project with id of ${id} not found`);
			} else {
				req.project = project;
				next();
			}
		} catch (err) {
			res.status(500).json(err.message);
		}
	}
};

// Reusable Data validation
const validateData = (model) => (req, res, next) => {
	// If passed-in model is 'action'
	if (model === 'action') {
		const { project_id, description, notes } = req.body;
		if (!project_id || !description || !notes) {
			res.status(400).json({
				message:
					'Please provide project id, description, and notes for the action',
			});
		} else {
			next();
		}
	}

	// If passed-in model is 'project'
	if (model === 'project') {
		const { name, description } = req.body;
		if (!name || !description) {
			res.status(400).json({
				message: 'Please provide name and description for the project',
			});
		} else {
			next();
		}
	}
};

module.exports = { validateId, validateData };
