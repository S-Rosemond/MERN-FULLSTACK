import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinners from './../Utils/spinners/Spinners';
import { getProfileById } from './../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

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

						<div className="profile-grid my-1">
							<ProfileTop profile={profile} />
							<ProfileAbout profile={profile} />
						</div>

						<div>
							<div className="profile-exp bg-white p-2 text-center">
								<h2 className="text-primary">Experience </h2>
								{profile.experience.length > 0 ? (
									<React.Fragment>
										{profile.experience.map(experience => (
											<ProfileExperience key={experience._id} experience={experience} />
										))}
									</React.Fragment>
								) : (
									<h4>No experience credentials</h4>
								)}
							</div>

							<div className="profile-edu bg-white p-2 text-center">
								<h2 className="text-primary">Education </h2>
								{profile.education.length > 0 ? (
									<React.Fragment>
										{profile.education.map(edu => (
											<ProfileEducation key={edu._id} education={edu} />
										))}
									</React.Fragment>
								) : (
									<h4>No education credentials</h4>
								)}
							</div>
						</div>
						{profile.githubusername && <ProfileGithub username={profile.githubusername} />}
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
