import React from 'react';
import PropTypes from 'prop-types';

const VersionSelector = props => {
	const [versions, setVersion] = React.useState();
	React.useEffect(() => {
		setVersion(selectedVersion);
	});

	return (
		<select onChange={props.setVersion}>
			{versions.map((version, i) => <option value={version} key={i}>{version}</option>)}
		</select>
	);
};

VersionSelector.propTypes = {
	selectedVersion: PropTypes.string.isRequired,
	setVersion: PropTypes.func.isRequired,
};

export default VersionSelector;
