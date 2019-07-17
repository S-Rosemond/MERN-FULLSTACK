import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from './../../actions/post';
import Spinners from './../Utils/spinners/Spinners';
import PostItem from './PostItem';

const Posts = ({ getPosts, posts: { loading, posts } }) => {
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
					{posts.map(post => <PostItem key={post._id} post={post} />)}
				</React.Fragment>
			)}
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	posts: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
