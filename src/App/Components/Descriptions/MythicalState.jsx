import React from 'react';
import {getIsMythical} from '../../Requests';
import PropTypes from 'prop-types';

const MythicalState = ({pokemon}) => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getIsMythical(pokemon)
			.then(setState);
	}, [pokemon]);

	return (
		<div>
			<p>Is mythical: {state ? 'Yes' : 'No'}</p>
		</div>
	);
};

MythicalState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default MythicalState;
