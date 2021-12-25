var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/create_account'
	})(req, res, next);


});

module.exports = router;