import {always, andThen, applySpec, identity, ifElse, pipeWith, prop} from 'ramda';
import {getArtwork, getIcon, getPokemonFlavourEntryWithVersion, getPokemonTypes} from './pokemon-request';
import {getPokemonNumber} from './pokedex-request';
import {API_URL} from '../constants/pokedex-constant.js';

const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`${API_URL}/pokemon/${pokemonName}`)
		.then(jsonify);

const isUndefined = value => value === undefined;

const asyncPipe = (asyncFunc, resultName) => requestResult =>
	pipeWith(andThen)([
		asyncFunc,
		ifElse(isUndefined, identity, applySpec({[resultName]: identity})),
		result => ({...result, ...requestResult}),
	])(requestResult);

const getAllFromPokemon = async pokemon =>
	pipeWith(andThen)([
		getPokemon,
		asyncPipe(getPokemonFlavourEntryWithVersion, 'flavourEntries'),
		applySpec({
			pokemonName: always(pokemon),
			officialArtwork: getArtwork,
			type: getPokemonTypes,
			icon: getIcon,
			pokemonNumber: getPokemonNumber,
			flavourEntries: prop('flavourEntries'),
		}),
	])(pokemon);

export {jsonify, getPokemon, getAllFromPokemon};
