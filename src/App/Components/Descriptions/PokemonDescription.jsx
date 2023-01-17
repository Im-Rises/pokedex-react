import React from 'react';
import {getFlavorEntry} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonDescription = ({pokemon, language}) => {
	const [description, setDescription] = React.useState('');
	React.useEffect(() => {
		getFlavorEntry(pokemon, language, 'y')
			.then(setDescription);
	}, [pokemon, language]);

	return (
		<div>
			<p>Pokemon description in {language}: {description}</p>
		</div>
	);
};

PokemonDescription.propTypes = {
	pokemon: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default PokemonDescription;
