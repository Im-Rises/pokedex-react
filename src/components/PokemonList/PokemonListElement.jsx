import PropTypes from 'prop-types';
import {getAllFromPokemon} from '../../requests/index.js';
import React from 'react';
import LazyLoadImage from '../LazyLoadImage/LazyLoadImage.jsx';
import './pokemon-list-element.scss';

export const PokemonListElement = props => {
	const imageGetter = () =>
		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => icon);

	return <div className={'pokemon-list-element'}>
		{<LazyLoadImage imageGetter={imageGetter} />}
		{props.pokemonName}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
