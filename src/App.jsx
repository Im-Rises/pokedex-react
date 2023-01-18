import React, {useEffect, useState} from 'react';
import LanguageSelector from './App/Components/Language/LanguageSelector';
import {POKEPEDIA_URL} from './App/Constants/constant';
import {makeRequest} from './App/Requests';
import SpritesObject from './App/Components/Sprites/SpritesObject';
import VersionSprites from './App/Components/Sprites/VersionSprites';
import PokemonMythicalState from './App/Components/Descriptions/PokemonMythicalState';
// import PokemonNumber from './App/Components/Descriptions/PokemonNumber';
// import PokemonName from './App/Components/Descriptions/PokemonName';
import PokemonDescription from './App/Components/Descriptions/PokemonDescription';
import PokemonLegendaryState from './App/Components/Descriptions/PokemonLegendaryState';

const App = () => {
	const [state, setState] = useState({
		pokemon: String,
		language: 'en',
		// eslint-disable-next-line camelcase
		search: {sprites: {other: {dream_world: {}, home: {}, 'official-artwork': {}}, versions: {}}},
		// eslint-disable-next-line camelcase
		pokemonSpecies: {flavor_text_entries: [], is_legendary: Boolean, is_mythical: Boolean},
		gameVersion: 'x',
	});

	const handlePokemon = event => setState({
		...state,
		pokemon: event.target.value.toLowerCase(),
	});

	const handleLanguage = event => setState({
		...state,
		language: event.target.value,
	});

	const handleSearch = res => setState({...state, search: res});
	const handleSearchSpecie = res => setState({...state, pokemonSpecies: res});

	const filterLanguageAndVersion = () => state.pokemonSpecies.flavor_text_entries.filter(
		({language: {name}}) => name === state.language).filter(
		({version: {name}}) => name === state.gameVersion);

	useEffect(() => {
		makeRequest(`${POKEPEDIA_URL}/pokemon/${state.pokemon}`)
			.then(handleSearch);
		makeRequest(`${POKEPEDIA_URL}/pokemon-species/${state.pokemon}`)
			.then(handleSearchSpecie);
	}, [state.pokemon, state.language]);

	const description = filterLanguageAndVersion()[0]?.flavor_text;

	return (
		<div>
			<form>
				<LanguageSelector initLanguage={state.language} setLanguage={handleLanguage}/>
				<input type={'text'} value={state.pokemon} onChange={handlePokemon}/>
			</form>
			<div>
				<SpritesObject obj={state.search.sprites} title={'common'}/>
				<SpritesObject obj={state.search.sprites.other.dream_world} title={'dream_world'}/>
				<SpritesObject obj={state.search.sprites.other.home} title={'home'}/>
				<SpritesObject obj={state.search.sprites.other['official-artwork']} title={'official-artwork'}/>
				<VersionSprites versions={state.search.sprites.versions}/>
				<PokemonDescription
					obj={description} title={'description'}/>
				<PokemonMythicalState obj={state.pokemonSpecies.is_mythical} title={'Mythical'}/>
				<PokemonLegendaryState obj={state.pokemonSpecies.is_legendary} title={'Legendary'}/>
			</div>
		</div>
	);
};

export default App;
