import React from 'react';
import {getIsLegendary} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonLegendaryState = ({pokemon}) => {
	const [isLengendary, setIsLengendary] = React.useState(Boolean);
	React.useEffect(() => {
		getIsLegendary(pokemon)
			.then(setIsLengendary);
	}, [pokemon]);

	return (
		<div>
			<p>Is legendary: {isLengendary ? 'Yes' : 'No'}</p>
		</div>
	);
};

PokemonLegendaryState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default PokemonLegendaryState;
