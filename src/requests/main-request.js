import {API_URL} from '../constants/pokedex-constant';

const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`${API_URL}/pokemon/${pokemonName}`)
		.then(jsonify);

export {getPokemon, jsonify};
