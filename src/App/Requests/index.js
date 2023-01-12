import {POKEPEDIA_URL} from './constant';

const initRequest = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
};

const getJsonFromRequest = resp => resp.json();

const makeRequest = url => fetch(url, initRequest)
	.then(getJsonFromRequest);

const getAllInfoOfPokemon = pokemon => makeRequest(`${POKEPEDIA_URL}/${pokemon}`);

const getAbilities = pokemon =>	getAllInfoOfPokemon(pokemon)
	.then(info => info.abilities);

const getSprites = pokemon => getAllInfoOfPokemon(pokemon)
	.then(info => Object.values(info.sprites))
	.then(obj => obj.filter(value => typeof value === 'string'));

export {getAllInfoOfPokemon, getAbilities, getSprites};
