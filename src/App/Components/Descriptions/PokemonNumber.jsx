import React from 'react';
import {getPokedexNumbers} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonNumber = ({pokemon, pokedex}) => {
	const [pokedexNumber, setPokedexNumber] = React.useState(Number);

	React.useEffect(() => {
		getPokedexNumbers(pokemon, pokedex)
			.then(setPokedexNumber);
	}, [pokemon, pokedex]);

	return (
		<div>
			<p>Pokemon number: {pokedexNumber}</p>
		</div>
	);
};

PokemonNumber.propTypes = {
	pokemon: PropTypes.string.isRequired,
	pokedex: PropTypes.string.isRequired,
};

export default PokemonNumber;
