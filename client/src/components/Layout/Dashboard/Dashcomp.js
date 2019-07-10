import React from 'react';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashcomp = ({ user, profile, loading }) => {
	const noProfile = (
		<React.Fragment>
			<p>You have not yet setup a profile, please add some info</p>
			<Link to="/create-profile" className="btn btn-primary my-1">
				Create Profile
			</Link>
		</React.Fragment>
	);

	const hasProfile = (
		<React.Fragment>
			<DashboardActions />
			<Experience experience={profile.experience} />
			<Education education={profile.education} />
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user-circle" /> Welcome {user && user.name}
			</p>
			{profile !== null ? hasProfile : noProfile}
		</React.Fragment>
	);
};

export default Dashcomp;
