// noinspection JSUnusedGlobalSymbols

// If eslint is complaining put this /* eslint-disable no-unused-vars */ at the top of the file

import {jsonify} from './index';

const getPokemonNumber = requestResult => requestResult?.id;
const getListOfPkmAvailable = nbr => fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nbr}`)
	.then(jsonify);

export {getPokemonNumber, getListOfPkmAvailable};
