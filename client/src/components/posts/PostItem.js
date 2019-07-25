import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeLike, addLikes, deletePost } from './../../actions/post';

const PostItem = ({
	post: { _id, text, name, avatar, user, likes, comments, date },
	auth,
	addLikes,
	removeLike,
	deletePost
}) => {
	return (
		<div className="posts">
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/profile/${user}`}>
						<img src={avatar} alt={name} className="round-img" />
						<h4>{name}</h4>
					</Link>
				</div>

				<div>
					<div className="my-1">
						<p className="post-date">
							<Moment format="MM/DD/YYYY">{date}</Moment>
						</p>
						{text}
					</div>

					<div>
						<button className="btn btn-primary" onClick={e => addLikes(_id)}>
							<i className="fas fa-thumbs-up" />
							<span> {likes.length > 0 && likes.length}</span>
						</button>
						<button
							className="btn btn-danger"
							onClick={e => {
								return removeLike(_id);
							}}
						>
							<i className="fas fa-thumbs-down" />
						</button>

						{comments.length > 0 && (
							<Link to={`/post/${_id}`} className="btn btn-light bg-dark">
								Discussion <span>{comments.length}</span>
							</Link>
						)}

						{!auth.loading &&
							user === auth.user._id && (
								<button type="button" className="btn btn-danger" onClick={e => deletePost(_id)}>
									Delete
								</button>
							)}
					</div>
				</div>
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLikes: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLikes, removeLike, deletePost })(PostItem);
