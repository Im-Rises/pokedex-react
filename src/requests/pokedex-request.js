// noinspection JSUnusedGlobalSymbols
/* eslint-disable no-unused-vars */
// If eslint is complaining put this /* eslint-disable no-unused-vars */ at the top of the file

import {getPokemon, jsonify} from './main-request';

const getPokemonNumber = pokemonName => getPokemon(pokemonName)
	.then(data => data.id)
	.catch(error => {
		console.error(error);
		return [];
	});

export {getPokemonNumber};
