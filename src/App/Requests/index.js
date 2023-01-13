import {POKEPEDIA_URL} from '../Constants/constant';

const initRequest = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
};

const getJsonFromRequest = resp => resp.json();

const makeRequest = url => fetch(url, initRequest)
	.then(getJsonFromRequest);

const getAllInfoOfPokemon = pokemon => makeRequest(`${POKEPEDIA_URL}/${pokemon}`);

const getAbilities = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({abilities}) => abilities);

const getSprites = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({sprites}) => sprites);

export {getAllInfoOfPokemon, getAbilities, getSprites};
