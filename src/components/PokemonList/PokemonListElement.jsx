import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {getAllFromPokemon} from '../../requests/index.js';
import React from 'react';
import LazyLoadImage from '../LazyLoadImage/LazyLoadImage.jsx';
import './pokemon-list-element.scss';

export const PokemonListElement = props => {
	const [icon, setIcon] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => setIcon(icon));
	}, [props.pokemonName]);

	return <div className={'pokemon-list-element'}>
		{icon && <LazyLoadImage src={icon}/>}
		{props.pokemonName}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
