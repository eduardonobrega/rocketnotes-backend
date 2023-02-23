const { Router } = require('express');

const notesRoutes = Router();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.get('/', notesController.index);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;
