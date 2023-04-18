/* eslint camelcase: 0 */
import React, {useEffect, useState} from 'react';
import {POKEPEDIA_URL} from './App/Constants/constant';
import {makeRequest} from './App/Requests';
import Opening from './App/Components/Opening/Opening';
import {List} from './App/Page/List';

const App = () => {
	const [state, setState] = useState({
		pokemon: String,
		language: 'en',
		search: {sprites: {other: {dream_world: {}, home: {}, 'official-artwork': {}}, versions: {}}},
		pokemonSpecies: {
			flavor_text_entries: [], is_legendary: Boolean, is_mythical: Boolean,
			pokedex_numbers: [], names: [],
		},
		gameVersion: 'x',
		hasOpened: false,
	});

	// eslint-disable-next-line no-unused-vars
	const handlePokemon = event => setState({
		...state,
		pokemon: event.target.value.toLowerCase(),
	});

	// eslint-disable-next-line no-unused-vars
	const handleLanguage = event => setState({
		...state,
		language: event.target.value,
	});

	const handleSearch = res => setState({...state, search: res});
	const handleSearchSpecie = res => setState({...state, pokemonSpecies: res});

	const handleHasOpened = () => setState({...state, hasOpened: true});

	useEffect(() => {
		makeRequest(`${POKEPEDIA_URL}/pokemon/${state.pokemon}`)
			.then(handleSearch);
		makeRequest(`${POKEPEDIA_URL}/pokemon-species/${state.pokemon}`)
			.then(handleSearchSpecie);
	}, [state.pokemon, state.language]);

	return (
		<>
			<Opening handleHasOpened={handleHasOpened} hasClicked={state.hasOpened}/>
			<List />
		</>
	);
};

export default App;
