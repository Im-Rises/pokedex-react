import React from 'react';
import {getPokedexNumbers} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonNumber = props => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getPokedexNumbers(props.pokemon, props.pokedex)
			.then(setState);
	}, [props]);

	return (
		<div>
			<p>Pokemon number: {state}</p>
		</div>
	);
};

PokemonNumber.propTypes = {
	pokemon: PropTypes.string.isRequired,
	pokedex: PropTypes.string.isRequired,
};

export default PokemonNumber;
