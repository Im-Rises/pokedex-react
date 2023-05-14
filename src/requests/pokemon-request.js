// noinspection JSUnusedGlobalSymbols
// If eslint is complaining put this /* eslint-disable no-unused-vars */ at the top of the file

import {LANGUAGE_NAME} from '../constants/pokedex-constant';
import {jsonify} from './main-request';

const getPokemonTypes = setter => requestResult => {
	setter(requestResult?.types.map(t => t?.type?.name));
	return requestResult;
};

const getPokemonFlavourEntryWithVersion = setter => requestResult => {
	fetch(requestResult?.species?.url).then(jsonify)
		.then(data => data.flavor_text_entries)
		.then(flavorTextEntries => {
			const filteredEntries = flavorTextEntries.filter(flavorTextEntry => flavorTextEntry.language.name === LANGUAGE_NAME);
			return {
				gameVersion: filteredEntries.map(flavorTextEntry => flavorTextEntry.version.name)
					.map(gameVersion => gameVersion.replace(/[\n\f\r]/g, ' ')),
				flavorText: filteredEntries.map(flavorTextEntry => flavorTextEntry.flavor_text)
					.map(flavorText => flavorText.replace(/[\n\f\r]/g, ' ')),
			};
		})
		.then(setter);
	return requestResult;
};

export {getPokemonTypes, getPokemonFlavourEntryWithVersion};