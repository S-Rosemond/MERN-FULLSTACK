const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   Post api/posts
//@ desc    Create a Post
//@access   Private
router.post(
	'/',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			const post = await newPost.save();

			res.json(post);
		} catch (error) {
			console.error(error.message);

			res.satus(500).send('Internal Server Error');
		}
	}
);

// @route   GET api/posts
//@ desc    GET all Post
//@access   Private
router.get('/', auth, async (req, res) => {
	try {
		/* If you want to limit users to seeing only their own post you can do :
		
		const post = await Post.find({user: req.user.id})
		
		outside of a get.('/:id'), depends on functionality wanted. Other get req would then be redundant; depends on functionality desired.
        */
		const post = await Post.find().sort({ date: -1 });
		res.json(post);
	} catch (error) {
		console.error(error.message);

		res.satus(500).send('Internal Server Error');
	}
});

// @route   GET api/posts/:id
//@ desc    GET Post by id
//@access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		// Keeping sort for latest post first
		const post = await Post.findById(req.params.id).sort({ date: -1 });

		if (!post) {
			res.status(404).json({ msg: 'Error 404: Post not found' });
		}

		res.json(post);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			res.status(404).json({ msg: 'Error 404: Post not found' });
		}

		res.satus(500).send('Internal Server Error');
	}
});

module.exports = router;
