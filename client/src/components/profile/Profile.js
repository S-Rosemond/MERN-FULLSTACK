import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinners from './../Utils/spinners/Spinners';
import { getProfileById } from './../../actions/profile';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
	const userProfile = (
		<React.Fragment>
			<div>profile</div>
			<div className="py-1">
				<Link to="/profiles" className="btn btn-primary">
					Back To Profiles
				</Link>
			</div>
			<div>
				{profile !== null &&
					auth !== null &&
					!auth.loading &&
					auth.isAuthenticated &&
					auth.user._id === profile.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}
			</div>
		</React.Fragment>
	);

	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[getProfileById, match]
	);
	return <React.Fragment>{profile === null || loading ? <Spinners /> : userProfile}</React.Fragment>;
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
