const express = require('express');
const api = require('./notes.js');
const notesRoute = require('./notes.js');

const router = express();

router.use('/api', api);

router.use('/notes', notesRoute);


module.exports = router;