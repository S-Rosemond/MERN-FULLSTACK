import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinners from './../Utils/spinners/Spinners';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(
		() => {
			getPost(match.params.id);
		},
		[getPost, match.params.id]
	);

	return loading || post === null ? (
		<Spinners />
	) : (
		<React.Fragment>
			<Link to="/posts" className="btn btn-dark">
				Back to Post
			</Link>
			<PostItem showActions={false} post={post} />
			<CommentForm postId={post._id} />
		</React.Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
