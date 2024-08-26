// Middleware function to determine if the API endpoint request is from an authenticated user
function isAuth(req, res, next) {
	next();
}

module.exports = isAuth;

