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

			res.status(500).send('Internal Server Error');
		}
	}
);
//-------------------------------------------------------------
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

		res.status(500).send('Internal Server Error');
	}
});
//--------------------------------------------------------------
// @route   GET api/posts/:id
//@ desc    GET Post by id
//@access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		// Keeping sort for latest post first
		const post = await Post.findById(req.params.id).sort({ date: -1 });

		if (!post) {
			return res.status(404).json({ msg: 'Error 404: Post not found' });
		}

		res.json(post);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Error 404: Post not found' });
		}

		res.status(500).send('Internal Server Error');
	}
});
//--------------------------------------------------------------
// @route   Delet api/posts/:id
//@ desc    Delete Post by id
//@access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// If post == 404
		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		// Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized Access' });
		}

		await post.remove();

		res.json({ msg: 'Post deletion successful' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Error 404: Post not found' });
		}
		res.status(500).send('Internal Server Error');
	}
});
//--------------------------------------------------------------
// @route   put api/posts/like/:id
//@ desc   	Like a post
//@access   Private

router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if post has already been liked by this user
		/* 
		Filter returns an array with matching criterion/critera || empty array if no match found

		Explanation for self since I didn't write the code logic, I make sure I understand the logic and decision choice.
		*/
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: 'Post already liked' });
		}
		/*
		 Not covered in course but option:
		 prevent the user of a post to like their own post.

		 Manually tested: working. 
		 */
		if (post.user.toString() === req.user.id) {
			/* return || return with a message depends on functionality wanted */
			return res.status(404).json({ msg: "Can't like your own post" });
		}

		// Could push but course uses unshift
		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
//-----------------------------------------------------------
// @route   put api/posts/unlike/:id
//@ desc   	Unlike a post
//@access   Private

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if post has already been liked
		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: 'Post has not been liked' });
		}

		// Get remove index
		const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));

		post.likes.splice(removeIndex, 1);

		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
//--------------------------------------------------------------
// @route   Post api/post/comment/:id
//@ desc    Create a Post
//@access   Private
router.post(
	'/comment/:id',
	[
		auth,
		[
			check('text', 'No empty comments')
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
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};
			post.comments.unshift(newComment);
			await post.save();

			res.json(post.comments);
		} catch (error) {
			console.error(error.message);

			res.status(500).send('Internal Server Error');
		}
	}
);
//--------------------------------------------------------------
// @route   Delete api/posts/comment/:id
//@ desc   	Delete a comment
//@access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		// Get post by id first
		const post = await Post.findById(req.params.id);

		// Pull comment out | find() high order func
		const comment = post.comments.find(comment => comment.id === req.params.comment_id);
		/*
		console.log(comment); 
		returns Object {
			date,
			_id,
			text,
			name,
			avatar,
			user
		}

		basically the comment matching requested id
		
		
		*/
		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}
		// Check user is same that made comment
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized User request' });
		}
		// Remove the comment
		/* course version was incorrect not sure if it was fixed later on, it deleted the last posted comment which was the first one in the array. This was one of the suggested solutions: calling remove(). */
		comment.remove();
		// Await save
		await post.save();
		// Return comments
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
//==============================================================
// Not covered in course
// @route   put api/posts/:id
//@ desc   	Update Post by id
//@access   Private
router.put(
	'/:id',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		/* 
			This keeps the same _id instead of splicing the doc and inserting a replacement which would generate a new _id which I did in the profile version. Since this uses auth, someone would need to know your password, etc for this to be a security risk. I'll leave the profile version since I am learning atm but I wouldn't use that method in prod.
			
			SAM USE THIS METHOD TO EDIT POST, PROFILE ETC!
		*/
		try {
			const post = await Post.findById({ _id: req.params.id });

			if (!post) {
				return res.status(404).json({ msg: 'Post not found' });
			}
			post.text = req.body.text;
			const changedPost = await post.save();
			res.json(changedPost);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
		}
	}
);
//--------------------------------------------------------------
// @route   update api/posts/comment/:id
//@ desc   	update a comment
//@access   Private
router.put('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		// Get post by id first
		const post = await Post.findById(req.params.id);

		// Pull comment out
		const comment = post.comments.find(comment => comment.id === req.params.comment_id);
		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}
		// Check user is same that made comment
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized User request' });
		}

		comment.text = req.body.text;
		/* 
		console.log('comment :', '\n', comment); 
		updates: Object 
		{
			date,
			_id,
			text,
			name,
			avatar,
			user

		}
		
		*/
		// Get index
		const index = post.comments.map(comment => comment._id.toString().indexOf(req.params.comment_id));
		// set comment
		post.comments[index] = comment;
		// Await save
		await post.save();
		// Return comments
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
