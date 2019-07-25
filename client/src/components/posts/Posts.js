import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from './../../actions/post';
import Spinners from './../Utils/spinners/Spinners';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { loading, posts } }) => {
	useEffect(
		() => {
			getPosts();
		},
		[getPosts]
	);

	return (
		<div>
			{loading ? (
				<Spinners />
			) : (
				<React.Fragment>
					<h1 className="large text-primary">Posts</h1>
					<p className="lead">
						<i className="fas fas-user-circle">Welcome to the community</i>
					</p>
					<PostForm />
					{posts.map(post => <PostItem key={post._id} post={post} />)}
				</React.Fragment>
			)}
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
