import {always, andThen, applySpec, identity, ifElse, pipeWith, prop} from 'ramda';
import {getArtwork, getIcon, getPokemonFlavourEntryWithVersion, getPokemonTypes} from './pokemon-request';
import {getPokemonNumber} from './pokedex-request';
import {API_URL, LANGUAGE_NAME} from '../constants/pokedex-constant.js';

const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`${API_URL}/pokemon/${pokemonName}`)
		.then(jsonify);

const getVersion = version =>
	fetch(`${API_URL}/version/${version}`)
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

// const getVersionCompleteName = version => getVersion(version).then(prop('names')).then(names => names.find(name => name.language.name === LANGUAGE_NAME).name);
// getVersionCompleteName('red').then(console.log);
//
// const getAllVersions = async () => {
// 	const versions = await fetch(`${API_URL}/version`)
// 		.then(jsonify)
// 		.then(prop('results'))
// 		.then(versions => versions.map(version => version.name));
// 	return Promise.all(versions.map(getVersionCompleteName));
// };
//
// getAllVersions().then(console.log);

const getAllVersions = async () => {
	const versions = await fetch(`${API_URL}/version`)
		.then(jsonify)
		.then(prop('results'))
		.then(versions => versions.map(version => version.name));
	return Promise.all(versions.map(getVersion));
};

const getVersionFromName = async versionName => {
	const versions = await getAllVersions();
	return versions.find(version => version.name === versionName);
};

getVersionFromName('red').then(console.log);

const uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export {jsonify, getPokemon, getAllFromPokemon, uppercaseFirstLetter};
