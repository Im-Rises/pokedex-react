import {POKEPEDIA_URL} from '../Constants/constant';
import * as R from 'ramda';

const initRequest = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
};

const getJsonFromRequest = resp => resp.json();

const convertObjectToList = obj => Object.values(obj);

const getAllStringsFromList = list => list.filter(value => typeof value === 'string');

const isString = value => typeof value === 'string';

const isObject = value => typeof value === 'object';

const getAllStringsValuesFromObject = R.pipe(R.values, R.filter(isString), R.tap(console.log));

const makeRequest = url => fetch(url, initRequest)
	.then(getJsonFromRequest);

const getAllInfoOfPokemon = pokemon => makeRequest(`${POKEPEDIA_URL}/${pokemon}`);

const getAbilities = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({abilities}) => abilities);

const getSprites = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({sprites}) => sprites);

export {
	getAllStringsValuesFromObject,
	getAllStringsFromList,
	convertObjectToList,
	getAllInfoOfPokemon,
	getAbilities,
	getSprites,
	isObject,
};
