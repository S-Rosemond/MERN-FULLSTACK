import React from 'react';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Account from './Account';

const Dashcomp = ({ user, profile, loading }) => {
	const noProfile = (
		<React.Fragment>
			<p>You have not yet setup a profile, please add some info</p>
			<Link to="/create-profile" className="btn btn-primary my-1">
				Create Profile
			</Link>
		</React.Fragment>
	);

	/*
	 Had to do this weird fix, issue wasn't covered in tutorial. Plus I deviated a bit in my implementation... Basically, when a new user registerd, the profile was null so profile.experience and .education was also null causing a crash. So I figured only add these values if profile is true. I didn't want to over think the fix :/
	 I could also check the length of experience and education, etc, but
	 :/
	*/
	const hasProfile = (
		<React.Fragment>
			<DashboardActions />
			<Experience experience={profile && profile.experience} />
			<Education education={profile && profile.education} />
			<Account acount={profile} />
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user-circle" /> Welcome {user && user.name}
			</p>

			{loading === false && profile !== null ? hasProfile : noProfile}
		</React.Fragment>
	);
};

export default Dashcomp;

/*
Can't delete account without a profile. I Will leave it as is and do something diff on my personal project using what I learn here.
*/
