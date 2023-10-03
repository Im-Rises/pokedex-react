import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {getAllFromPokemon, uppercaseFirstLetter} from '../../requests/index.js';
import React from 'react';
import LazyLoadImage from '../LazyLoadImage/LazyLoadImage.jsx';

export const PokemonListElement = props => {
	const [icon, setIcon] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => setIcon(icon));
	}, [props.pokemonName]);

	return <div>
		 {icon && <LazyLoadImage src={icon}/>}
		{uppercaseFirstLetter(props.pokemonName)}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
