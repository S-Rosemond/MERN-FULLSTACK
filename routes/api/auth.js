const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const { check, validationResult } = require('express-validator/check');

// @route   GET api/auth
//@ desc    Auth GET w/token
//@access   Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route   Post api/auth
//@ desc    Auth user & get token
//@access   Public

router.post(
	'/',
	[
		check('email', 'Please include a valid email address').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}
			// Return user with matching id
			const payload = {
				user: {
					id: user.id
				}
			};
			// validate password matchs with bcrypt compare
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			/* Sign token */
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (error, token) => {
				if (error) throw error;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
