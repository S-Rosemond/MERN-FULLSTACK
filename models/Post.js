const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	like: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			},
			like: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					}
				}
			]
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

// Note: convention from another tutorial is to use Uppercase for model name. This course uses lowercase, but also sets the model to the Uppercase exported variable. Keeping everything as is to prevent confusion.
module.exports = Post = mongoose.model('post', PostSchema);