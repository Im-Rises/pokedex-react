import {always, andThen, applySpec, identity, ifElse, pipeWith, prop} from 'ramda';
import {getArtwork, getIcon, getPokemonFlavorEntryWithVersion, getPokemonTypes} from './pokemon-request';
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
		asyncPipe(getPokemonFlavorEntryWithVersion, 'flavorEntries'),
		applySpec({
			pokemonName: always(pokemon),
			officialArtwork: getArtwork,
			type: getPokemonTypes,
			icon: getIcon,
			pokemonNumber: getPokemonNumber,
			flavorEntries: prop('flavorEntries'),
		}),
	])(pokemon);

// const getVersion = version =>
// 	fetch(`${API_URL}/version/${version}`)
// 		.then(jsonify);

// const getVersionRealName = versionCode => getVersion(versionCode).then(prop('names')).then(names => names.find(name => name.language.name === LANGUAGE_NAME).name);

const getPokemonOtherInfo = pokemonName => getPokemon(pokemonName).then(
	applySpec({
		height: prop('height'),
		weight: prop('weight'),

	}));

export {jsonify, getPokemon, getAllFromPokemon, getPokemonOtherInfo};
