/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

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

/* -------------------------------------POKEMON ABILITIES------------------------------------- */

const getAbilities = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({abilities}) => abilities);

/* -------------------------------------POKEMON SPRITES------------------------------------- */

const getSprites = pokemon => getAllInfoOfPokemon(pokemon)
	.then(({sprites}) => sprites);

/* -------------------------------------POKEMON SPECIES------------------------------------- */

const getPokemonSpecies = pokemon => makeRequest(`${POKEPEDIA_URL}/pokemon-species/${pokemon}`);

const getIsLegendary = pokemon => getPokemonSpecies(pokemon).then(({is_legendary}) => is_legendary);

const getIsMythical = pokemon => getPokemonSpecies(pokemon).then(({is_mythical}) => is_mythical);

const getPokedexNumbers = pokemon => getPokemonSpecies(pokemon).then(({pokedex_numbers}) => pokedex_numbers);

const getColor = pokemon => getPokemonSpecies(pokemon).then(({color}) => color);

const getShape = pokemon => getPokemonSpecies(pokemon).then(({shape}) => shape);

const getEvolvesFromSpecies = pokemon => getPokemonSpecies(pokemon).then(({evolves_from_species}) => evolves_from_species);

// const getEvolutionChain = pokemon => getPokemonSpecies(pokemon).then(({evolution_chain}) => evolution_chain);

const getGeneration = pokemon => getPokemonSpecies(pokemon).then(({generation}) => generation);

const getNames = pokemon => getPokemonSpecies(pokemon).then(({names}) => names);

const getFlavourTextEntries = pokemon => getPokemonSpecies(pokemon).then(({flavor_text_entries}) => flavor_text_entries);

const getFormDescriptions = pokemon => getPokemonSpecies(pokemon).then(({form_descriptions}) => form_descriptions);

const getGenera = pokemon => getPokemonSpecies(pokemon).then(({genera}) => genera);

const getVarieties = pokemon => getPokemonSpecies(pokemon).then(({varieties}) => varieties);

export {
	getAllStringsValuesFromObject,
	getAllInfoOfPokemon,
	getAbilities,
	getSprites,
	getFlavourTextEntries,
	getIsLegendary,
	getIsMythical,
	getPokedexNumbers,
};
