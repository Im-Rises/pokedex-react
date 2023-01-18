import React from 'react';
import PropTypes from 'prop-types';

const VersionSelector = () => {
	console.log('VersionSelector');
	return (
		<select>

		</select>
	);
};

VersionSelector.propTypes = {
	selectedVersion: PropTypes.string.isRequired,
	setVersion: PropTypes.func.isRequired,
};

export default VersionSelector;
