import {LANGUAGE_NAME} from '../constants/pokedex-constant';
import {jsonify} from './index';
import {andThen, applySpec, filter, map, path, pipe, pipeWith, prop, replace} from 'ramda';

const getArtwork = requestResult => requestResult.sprites.other['official-artwork'].front_default;

const getIcon = requestResult => requestResult?.sprites?.versions['generation-viii']?.icons?.front_default;

const getPokemonTypes = requestResult => requestResult?.types?.map(t => t?.type?.name);

// const getPokemonHeight = requestResult => requestResult?.height;
// const getPokemonWeight = requestResult => requestResult?.weight;

const getSpeciesUrl = requestResult => requestResult?.species?.url;

const fetchSpecies = requestResult => fetch(getSpeciesUrl(requestResult));

const isCorrectLanguage = flavourTextEntry => flavourTextEntry?.language?.name === LANGUAGE_NAME;

const cleanText = replace(/[\n\f\r]/g, ' ');

const getAllVersionName = map(pipe(path(['version', 'name']), cleanText));

const getAllFlavorText = map(pipe(prop('flavor_text'), cleanText));

// const getPokemonOtherInfo = requestResult => ({
// 	height: requestResult?.height?,
// 	weight: requestResult?.weight?,
// });

const getPokemonFlavourEntryWithVersion = requestResult => pipeWith(andThen)([
	fetchSpecies,
	jsonify,
	prop('flavor_text_entries'),
	filter(isCorrectLanguage),
	applySpec({
		gameVersion: getAllVersionName,
		flavorText: getAllFlavorText,
	}),
])(requestResult);

export {getPokemonTypes, getIcon, getArtwork, getPokemonFlavourEntryWithVersion};
