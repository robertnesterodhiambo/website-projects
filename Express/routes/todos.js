var express = require('express');
var router = express.Router();
const isAuth = require('../middleware/middleware');

/* Return all the logged in users todo's with the category associated with each todo and
status that is not the deleted status */
router.get('/', isAuth, (req, res) => {
	return;
});

// Return all the users todos including todos with a deleted status
router.get('/all', isAuth, (req, res) => {
	return;
});

// Return all the todos with the deleted status
router.get('deleted', (req, res) => {
	return;
});

// Add a new todo with their category for the logged in user
router.post('/', isAuth, (req, res) => {
	return;
});

// Return all the statuses from the database
router.get('/statuses', (req, res) => {
	return;
});

// Change/update a specific todo for logged in user
router.put('/:id', isAuth, (req, res) => {
	return;
});

// Delete a specific todo if for the logged in user
router.delete('/:id', isAuth, (req, res) => {
	return;
});

module.exports = router;

