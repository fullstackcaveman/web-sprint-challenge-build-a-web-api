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
	// Sets data validation to model that is passed-in
	const data =
		model === 'action'
			? req.body.project_id && req.body.description && req.body.notes
			: req.body.name && req.body.description;

	// Sets .status(400) message to model that is passed-in
	const missingData =
		model === 'action'
			? 'Please provide project id, description, and notes for the action'
			: 'Please provide name and description for the project';

	if (!data) {
		res.status(400).json({ message: missingData });
	} else {
		next();
	}
};

module.exports = { validateId, validateData };
