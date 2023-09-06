import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {getAllFromPokemon} from '../../requests/index.js';
import React from 'react';

export const PokemonListElement = props => {
	const [icon, setIcon] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => setIcon(icon));
	}, [props.pokemonName]);

	return <div>
		{icon && <img src={icon} alt={''}/>}
		{props.pokemonName}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
