// Renamed imports to work with Dynamic Variables
const { get: actionGet } = require('../actions/actions-model');
const { get: projectGet } = require('../projects/projects-model');

// Refactored both middleware files using 2 middleware functions each into 1 middleware file with 2 reusable functions

// Reusable Id validation
const validateId = (model) => async (req, res, next) => {
	const id = req.params.id;

	// Changing 1st letter of model to uppercase for the .status(404)
	const upperCaseModel = model.charAt(0).toUpperCase() + model.slice(1);

	// Dynamic variable based on what is passed into middleware
	const modelGet = model === 'action' ? actionGet : projectGet;

	try {
		const data = await modelGet(id);
		if (!data) {
			res.status(404).json(`${upperCaseModel} with id of ${id} not found`);
		} else {
			req.data = data;
			next();
		}
	} catch (err) {
		res.status(500).json(err.message);
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
