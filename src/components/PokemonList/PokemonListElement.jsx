import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {getAllFromPokemon, uppercaseFirstLetter} from '../../requests/index.js';
import React from 'react';
import PokeballLoadingImage from '/src/images/loading/pokeball-loading-50x50.gif';

const PokemonImageLogo = props => {
	const [icon, setIcon] = useState(PokeballLoadingImage);

	useEffect(() => {
		// if props.src update
		if (props.src) {
			setIcon(props.src);
		}
	}, [props.src]);

	return <img src={icon} alt={props.pokemonName}/>;
};

PokemonImageLogo.propTypes = {
	src: PropTypes.string.isRequired,
	pokemonName: PropTypes.string.isRequired,
};

export const PokemonListElement = props => {
	const [icon, setIcon] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => setIcon(icon));
	}, [props.pokemonName]);

	return <div>
		{/* {icon && <LazyLoadImage src={icon}/>} */}
		{icon && <PokemonImageLogo src={icon} pokemonName={props.pokemonName}/>}
		{uppercaseFirstLetter(props.pokemonName)}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
