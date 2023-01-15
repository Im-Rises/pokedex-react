import React from 'react';
import {getIsLegendary} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonLegendaryState = ({pokemon}) => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getIsLegendary(pokemon)
			.then(setState);
	}, [pokemon]);

	return (
		<div>
			<p>Is legendary: {state ? 'Yes' : 'No'}</p>
		</div>
	);
};

PokemonLegendaryState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default PokemonLegendaryState;
