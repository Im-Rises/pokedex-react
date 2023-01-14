import {POKEPEDIA_URL} from '../Constants/constant';
import * as R from 'ramda';

const initRequest = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
};

const getJsonFromRequest = resp => resp.json();

const isString = value => typeof value === 'string';

const getAllStringsValuesFromObject = R.pipe(R.values, R.filter(isString));

const makeRequest = url => fetch(url, initRequest)
	.then(getJsonFromRequest);

const getAllInfoOfPokemon = pokemon => makeRequest(`${POKEPEDIA_URL}/pokemon/${pokemon}`);

const getAbilities = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({abilities}) => abilities);

const getSprites = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({sprites}) => sprites);

const getPokemonCharacteristic = pokemon => makeRequest(`${POKEPEDIA_URL}/characteristic/${pokemon}`);

const getDescriptions = pokemon => getPokemonCharacteristic(pokemon).then(({descriptions}) => descriptions);

export {
	getAllStringsValuesFromObject,
	getAllInfoOfPokemon,
	getAbilities,
	getSprites,
	getDescriptions,
};
