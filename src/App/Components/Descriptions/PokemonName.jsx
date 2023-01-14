import React from 'react';
import {getName} from '../../Requests';
import PropTypes from 'prop-types';

const PokemonName = props => {
	const [state, setState] = React.useState([]);
	React.useEffect(() => {
		getName(props.pokemon, props.language)
			.then(setState);
	}, [props]);

	return (
		<div>
			<p>Pokemon name in {props.language}: {state}</p>
		</div>
	);
};

PokemonName.propTypes = {
	pokemon: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default PokemonName;
