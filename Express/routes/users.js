var express = require('express');
var router = express.Router();
var jsend = require('jsend');
router.use(jsend.middleware);

// Post for registered users to be able to login
router.post('/login', (req, res, next) => {
	return;
});

// Post for new users to register / signup
router.post('/signup', (req, res, next) => {
	return;
});

router.get('/fail', (req, res) => {
	return res.status(401).jsend.error({ statusCode: 401, message: 'message', data: 'data' });
});

module.exports = router;

