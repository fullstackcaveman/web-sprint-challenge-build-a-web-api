const Actions = require('../actions/actions-model');

const validateActionId = async (req, res, next) => {
	const id = req.params.id;

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
};

const validateAction = (req, res, next) => {
	const { project_id, description, notes } = req.body;
	if (!project_id || !description || !notes) {
		res.status(400).json({
			message:
				'Please provide project id, description, and notes for the action',
		});
	} else {
		next();
	}
};

module.exports = { validateActionId, validateAction };
