import React, {useEffect, useState} from 'react';
import {getAllFromPokemon} from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';
import PropTypes from 'prop-types';
import * as R from 'ramda';

export const PokemonDetails = props => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);

	useEffect(() => {
		getAllFromPokemon(pokemonData.pokemonName).then(R.tap(console.log))
			.then(setPokemonData);
	}, [props.name]);

	// console.log(pokemonData);

	return (
		<>
			{/* <div> */}
			{/*	<h1>Pokémon Info</h1> */}
			{/* </div> */}
			{/* <div> */}
			{/*	<img src={pokemonData.officialArtwork} alt={pokemonName}/> */}
			{/* </div> */}
			{/* <div> */}
			{/*	/!* <p>N°{pokemonData.pokemonNumber}</p> *!/ */}
			{/*	/!* <h2>{name}</h2> *!/ */}
			{/*	/!* <ul> *!/ */}
			{/*	/!*	{pokemonData.type.map((type, index) => ( *!/ */}
			{/*	/!*		<li key={index}>{type}</li> *!/ */}
			{/*	/!*	))} *!/ */}
			{/*	/!* </ul> *!/ */}
			{/* </div> */}
			{/* <div> */}
			{/*	<p>{pokemonData.flavourEntries}</p> */}
			{/* </div> */}
		</>
	);
};

PokemonDetails.propTypes = {
	name: PropTypes.string.isRequired,
};
