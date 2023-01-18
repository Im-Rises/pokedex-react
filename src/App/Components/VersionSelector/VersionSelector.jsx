import React from 'react';
import PropTypes from 'prop-types';

const VersionSelector = () => {
	const [versions, setVersions] = React.useState([]);
	React.useEffect(() => {
		getVersions().then(setVersions);
	});
	return (
		<select>

		</select>
	);
};

VersionSelector.propTypes = {
	initVersion: PropTypes.array.isRequired,
	setVersion: PropTypes.func.isRequired,
};

export default VersionSelector;
