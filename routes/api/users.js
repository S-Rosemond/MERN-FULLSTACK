const express = require('express');
const router = express.Router();

// Validator
const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
//@ desc    Register user
//@access   Public

/* 
Over view: add new param: Array~[] w/ check & chained checker functions. 
Pass in req in ValidationResult().
If it is empty ok: 200 
else it will return errors.
send a 400 status error chain as json by passing an object with error result error.array() 
*/
router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email address').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		res.send('User Route');
	}
);

module.exports = router;
