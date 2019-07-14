import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinners from './../Utils/spinners/Spinners';
import { getProfileById } from './../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[getProfileById, match.params.id]
	);
	/* 
	put all jsx in render || return no matter if it looks ulgy, it can retreive values easier.
	*/

	return (
		<React.Fragment>
			{profile === null || loading ? (
				<Spinners />
			) : (
				<React.Fragment>
					<div className="py-1">
						<Link to="/profiles" className="btn btn-primary">
							Back To Profiles
						</Link>
					</div>
					<div>
						{!auth.loading &&
							auth.isAuthenticated &&
							auth.user._id === profile.user._id && (
								<Link to="/edit-profile" className="btn btn-dark">
									Edit Profile
								</Link>
							)}
					</div>
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
