import {LANGUAGE_NAME} from '../constants/pokedex-constant';
import {jsonify} from './main-request';

const getPokemonTypes = requestResult => requestResult?.types?.map(t => t?.type?.name);

const getPokemonFlavourEntryWithVersion = async requestResult =>
	fetch(requestResult?.species?.url)
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
