import React from 'react';
import spinner from './spinners.gif';

const flex = {
	width: '6.25rem',
	margin: '  20em auto',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

const Spinners = () => {
	return (
		<React.Fragment>
			<img src={spinner} style={flex} alt="Loading Page..." />
		</React.Fragment>
	);
};

export default Spinners;
