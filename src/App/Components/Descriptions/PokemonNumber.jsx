import React from 'react';
import {getPokedexNumbers} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonNumber = ({pokemon}) => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getPokedexNumbers(pokemon)
			.then(setState);
	}, [pokemon]);

	return (
		<div>
			<p>Pokemon number: {state}</p>
		</div>
	);
};

PokemonNumber.propTypes = {
	pokemon: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default PokemonNumber;
