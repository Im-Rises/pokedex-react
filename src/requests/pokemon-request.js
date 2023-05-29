import {LANGUAGE_NAME} from '../constants/pokedex-constant';
import {jsonify} from './main-request';
import {andThen, applySpec, filter, map, path, pipe, pipeWith, prop, replace} from 'ramda';

const getArtwork = requestResult => requestResult?.sprites?.front_default;

const getIcon = requestResult => requestResult?.sprites?.versions['generation-viii']?.icons?.front_default;

const getPokemonTypes = requestResult => requestResult?.types?.map(t => t?.type?.name);

const getSpeciesUrl = requestResult => requestResult?.species?.url;

const fetchSpecies = requestResult => fetch(getSpeciesUrl(requestResult));

const isCorrectLanguage = flavourTextEntry => flavourTextEntry?.language?.name === LANGUAGE_NAME;

const getPokemonFlavourEntryWithVersion = requestResult => pipeWith(andThen)([
	fetchSpecies,
	jsonify,
	prop('flavor_text_entries'),
	filter(isCorrectLanguage),
	applySpec({
		gameVersion: map(pipe(path(['version', 'name']), replace(/[\n\f\r]/g, ' '))),
		flavorText: map(pipe(prop('flavor_text'), replace(/[\n\f\r]/g, ' '))),
	}),
])(requestResult);

export {getPokemonTypes, getIcon, getArtwork, getPokemonFlavourEntryWithVersion};
