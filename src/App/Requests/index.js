/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

import {POKEPEDIA_URL} from '../Constants/constant';
import * as R from 'ramda';

const initRequest = {
	method: 'GET',
	mode: 'cors',
	cache: 'default',
	headers: {'Content-Type': 'application/json'},
};

const isGetOk = R.prop('ok');

const getJsonFromRequest = resp => resp.json();

const getJsonIfOk = R.ifElse(isGetOk, getJsonFromRequest, R.identity);

const getAllStringsValuesFromObject = R.pipe(R.values, R.filter(R.is(String)));

const makeRequest = url => fetch(url, initRequest)
	.then(getJsonFromRequest);

const getAllInfoOfPokemon = pokemon => makeRequest(`${POKEPEDIA_URL}/pokemon/${pokemon}`);

/* -------------------------------------POKEDEX API LANGUAGES------------------------------------- */

const getLanguageData = language => makeRequest(`${POKEPEDIA_URL}/language/${language}`);

const getLanguageIdentifiers = () => getLanguageData('').then(({results}) => results);

// const getLanguageRealName = inputLanguage => getLanguageData(inputLanguage).then(({names}) =>
// 	names.filter(({language}) => language.name === inputLanguage)).then(a => a[0].name);
//
// getLanguageRealName('en').then(console.log); //OK
// getLanguageRealName('fr').then(console.log); //OK
// getLanguageRealName('es').then(console.log); //OK
// getLanguageRealName('it').then(console.log); //NOK

/* -------------------------------------POKEDEX VERSIONS------------------------------------- */

const getPokedexData = pokedex => makeRequest(`${POKEPEDIA_URL}/pokedex/${pokedex}`);

const getPokedexIdentifiers = () => getPokedexData('').then(({results}) => results);

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

const getPokedexNumbers = (pokemonTarget, pokedexTarget) => getPokemonSpecies(pokemonTarget).then(({pokedex_numbers}) =>
	pokedex_numbers.filter(({pokedex}) => pokedex.name === pokedexTarget)).then(a => a[0].entry_number);

const getName = (pokemon, targetLanguage) => getPokemonSpecies(pokemon).then(({names}) =>
	names.filter(({language}) => language.name === targetLanguage)).then(a => a[0].name);

/* -------------------------------------POKEMON DESCRIPTION------------------------------------- */

const getPokemonGameVersionsIdentifiers = pokemon => getPokemonSpecies(pokemon).then(({flavor_text_entries}) =>
	flavor_text_entries.map(({version}) => version));

// const getFlavorTextEntry = (pokemon, targetLanguage, version) => getPokemonSpecies(pokemon).then(({flavor_text_entries}) =>
// 	flavor_text_entries.filter(({language}) => language.name === targetLanguage)).then(a => a[0].flavor_text.replace('\u000c', ' '));

const getFlavorEntry = (pokemon, targetLanguage, targetVersion) => getPokemonSpecies(pokemon).then(({flavor_text_entries}) => {
	const flavorText = flavor_text_entries.filter(({language}) => language.name === targetLanguage);
	const flavorTextVersion = flavorText.filter(({version}) => version.name === targetVersion);
	return flavorTextVersion[0].flavor_text.replace('\u000c', ' ');
});

export {
	makeRequest,
	getLanguageIdentifiers,
	getAllStringsValuesFromObject,
	getAllInfoOfPokemon,
	getAbilities,
	getSprites,
	getFlavorEntry,
	getIsLegendary,
	getIsMythical,
	getPokedexNumbers,
	getName,
	getPokedexIdentifiers,
};

/* -------------------------------------TRASH DON'T DELETE------------------------------------- */

// const getColor = pokemon => getPokemonSpecies(pokemon).then(({color}) => color);

// const getShape = pokemon => getPokemonSpecies(pokemon).then(({shape}) => shape);

// const getEvolvesFromSpecies = pokemon => getPokemonSpecies(pokemon).then(({evolves_from_species}) => evolves_from_species);

// const getEvolutionChain = pokemon => getPokemonSpecies(pokemon).then(({evolution_chain}) => evolution_chain);

// const getGenera = pokemon => getPokemonSpecies(pokemon).then(({genera}) => genera);

// const getVarieties = pokemon => getPokemonSpecies(pokemon).then(({varieties}) => varieties);

// const getGeneration = pokemon => getPokemonSpecies(pokemon).then(({generation}) => generation);

// const getFormDescriptions = pokemon => getPokemonSpecies(pokemon).then(({form_descriptions}) => form_descriptions);
