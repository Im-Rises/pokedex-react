import React, {useEffect, useState} from 'react';
import getAllFromPokemon from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';

export const PokemonDetails = pokemonName => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	useEffect(() => {
		getAllFromPokemon(pokemonName)
			.then(setPokemonData);
	}, [pokemonName]);

	console.log(pokemonData);

	// const types = ['Electric'];
	// const description = 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.';
	// const imageLink = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png';
	// const number = '025';
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

