import React from 'react';
import {getIsMythical} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonMythicalState = ({pokemon}) => {
	const [isMythical, setIsMythical] = React.useState(Boolean);
	React.useEffect(() => {
		getIsMythical(pokemon)
			.then(setIsMythical);
	}, [pokemon]);

	return (
		<div>
			<p>Is mythical: {isMythical ? 'Yes' : 'No'}</p>
		</div>
	);
};

PokemonMythicalState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default PokemonMythicalState;
