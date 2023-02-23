const { Router } = require('express');

const router = Router();

const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const notesRouter = require('./notes.routes');
const tagsRouter = require('./tags.routes');

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/notes', notesRouter);
router.use('/tags', tagsRouter);

module.exports = router;
