import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from './../../actions/post';
import Spinners from './../Utils/spinners/Spinners';

const Posts = ({ getPosts, posts: { loading, posts } }) => {
	useEffect(
		() => {
			getPosts();
		},
		[getPosts]
	);

	return <div>{!loading && posts !== null && console.log(typeof posts)}</div>;
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	posts: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
