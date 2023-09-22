import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import {getAllFromPokemon, uppercaseFirstLetter} from '../../requests/index.js';
import React from 'react';
import {clementPokemonData, quentinPokemonData} from '../../constants/pokemon-data-fetch.js';
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
		// Don't mind this code, it's juste a joke 😝
		if (props.pokemonName === clementPokemonData.pokemonName) {
			setIcon(clementPokemonData.icon);
			return;
		}

		// Leave this code, it's the perfection 😁
		if (props.pokemonName === quentinPokemonData.pokemonName) {
			setIcon(quentinPokemonData.icon);
			return;
		}

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
