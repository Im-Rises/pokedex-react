import {always, andThen, applySpec, identity, ifElse, pipeWith, prop} from 'ramda';
import {getArtwork, getIcon, getPokemonFlavourEntryWithVersion, getPokemonTypes} from './pokemon-request';
import {getPokemonNumber} from './pokedex-request';
import {API_URL, LANGUAGE_NAME} from '../constants/pokedex-constant.js';

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

const getVersion = version =>
	fetch(`${API_URL}/version/${version}`)
		.then(jsonify);

const getVersionRealName = versionCode => getVersion(versionCode).then(prop('names')).then(names => names.find(name => name.language.name === LANGUAGE_NAME).name);

const uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export {jsonify, getPokemon, getAllFromPokemon, uppercaseFirstLetter, getVersionRealName};
