import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinners from './../Utils/spinners/Spinners';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	const showProfiles = (
		<React.Fragment>
			<h1 className="large text-primary">Developers</h1>
			<p className="lead">
				<i className="fab fa-connectdevelop" /> Browser and connect with developers
			</p>
			<div className="profiles">
				{profiles.length > 0 ? (
					profiles.map(profile => <ProfileItem key={profile._id} profiles={profile} />)
				) : (
					<h4>No Profiles Found</h4>
				)}
			</div>
		</React.Fragment>
	);

	useEffect(
		() => {
			getAllProfiles();
		},
		[getAllProfiles]
	);
	return <React.Fragment>{loading ? <Spinners /> : showProfiles}</React.Fragment>;
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
