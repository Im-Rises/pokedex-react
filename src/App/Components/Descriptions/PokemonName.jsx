import React from 'react';
import {getName} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonName = ({pokemon, language}) => {
	const [name, setName] = React.useState(String);

	React.useEffect(() => {
		getName(pokemon, language)
			.then(setName);
	}, [pokemon, language]);

	return (
		<div>
			<p>Pokemon name in {language}: {name}</p>
		</div>
	);
};

PokemonName.propTypes = {
	pokemon: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default PokemonName;
