// noinspection JSUnusedGlobalSymbols
// If eslint is complaining put this /* eslint-disable no-unused-vars */ at the top of the file

import {LANGUAGE_NAME} from '../constants/pokedex-constant';
import {getPokemon, jsonify} from './main-request';

const getPokemonTypes = pokemonName =>
	getPokemon(pokemonName)
		.then(data => data.types)
		.catch(error => {
			console.error(error);
			return [];
		}).then(types => types.map(type => type.type.name));

const getPokemonFlavourEntryWithVersion = pokemonName =>
	getPokemon(pokemonName)
		.then(data => data.species.url)
		.then(url => fetch(url))
		.then(jsonify)
		.then(data => data.flavor_text_entries)
		.then(flavorTextEntries => {
			const filteredEntries = flavorTextEntries.filter(flavorTextEntry => flavorTextEntry.language.name === LANGUAGE_NAME);
			return {
				gameVersion: filteredEntries.map(flavorTextEntry => flavorTextEntry.version.name)
					.map(gameVersion => gameVersion.replace(/[\n\f\r]/g, ' ')),
				flavorText: filteredEntries.map(flavorTextEntry => flavorTextEntry.flavor_text)
					.map(flavorText => flavorText.replace(/[\n\f\r]/g, ' ')),
			};
		});

export {getPokemonTypes, getPokemonFlavourEntryWithVersion};
