import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from './../../../actions/profile';
import Spinners from './../../Utils/spinners/Spinners';
import Dashcomp from './Dashcomp';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return loading && profile === null ? (
		<Spinners />
	) : (
		<React.Fragment>
			<Dashcomp user={user} profile={profile} loading={loading} />
		</React.Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
