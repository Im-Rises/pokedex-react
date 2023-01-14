import React from 'react';
import {getFlavorTextEntry} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonDescription = props => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getFlavorTextEntry(props.pokemon, props.language)
			.then(setState);
	}, [props]);

	return (
		<div>
			<p>Pokemon description in {props.language}: {state}</p>
		</div>
	);
};

PokemonDescription.propTypes = {
	pokemon: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default PokemonDescription;
