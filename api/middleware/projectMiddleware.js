const Projects = require('../projects/projects-model');

const validateProjectId = async (req, res, next) => {
	const id = req.params.id;

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
};

const validateProject = (req, res, next) => {
	const { name, description } = req.body;
	if (!name || !description) {
		res.status(400).json({
			message: 'Please provide name and description for the project',
		});
	} else {
		next();
	}
};

module.exports = { validateProjectId, validateProject };
