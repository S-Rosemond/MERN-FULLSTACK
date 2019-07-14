import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) => {
	return (
		<div className="profile-about bg-light p-2">
			{bio && (
				<React.Fragment>
					<h2 className="text-primary">{`${name.trim().split(' ')[0]}s Bio`}</h2>
					<p>{bio}</p>
					<div className="line " />
				</React.Fragment>
			)}
			<h2 className="text-primary "> Skill Set</h2>
			<div className="skills">
				{skills.map((skill, index) => (
					<div className="p-1" key={index}>
						<strong>{skill}</strong> <i className="fas fa-check text-primary" />
					</div>
				))}
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
