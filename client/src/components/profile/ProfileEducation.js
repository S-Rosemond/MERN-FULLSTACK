import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, from, to } }) => {
	return (
		<div>
			<p>{school}</p>
			<span>
				<strong className="text-dark">Degree:</strong> {degree}
			</span>
			<p>
				<strong>Subject:</strong> {fieldofstudy}
			</p>
			<p>
				<Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
			</p>
		</div>
	);
};

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired
};

export default ProfileEducation;
