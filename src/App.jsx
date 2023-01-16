import React, {useEffect, useState} from 'react';
import LanguageSelector from './App/Components/Language/LanguageSelector';
import {POKEPEDIA_URL} from './App/Constants/constant';
import {makeRequest} from './App/Requests';
import ShowAllSpriteOfObject from './App/Components/Sprites/ShowAllSpriteOfObject';

const App = () => {
	const [state, setState] = useState({
		pokemon: String,
		language: 'en',
		// eslint-disable-next-line camelcase
		search: {sprites: {other: {dream_world: {}, home: {}, 'official-artwork': {}}}},
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

	useEffect(() => {
		makeRequest(`${POKEPEDIA_URL}/pokemon/${state.pokemon}`)
			.then(handleSearch);

		// make request here for language and fill state
	}, [state.pokemon, state.language]);

	return (
		<div>
			<form>
				<LanguageSelector initLanguage={state.language} setLanguage={handleLanguage}/>
				<input type={'text'} value={state.pokemon} onChange={handlePokemon}/>
			</form>
			<div>
				<ShowAllSpriteOfObject ObjectOfUrl={state.search.sprites} title={'common'}/>
				<ShowAllSpriteOfObject ObjectOfUrl={state.search.sprites.other.dream_world} title={'dream_world'}/>
				<ShowAllSpriteOfObject ObjectOfUrl={state.search.sprites.other.home} title={'home'}/>
				<ShowAllSpriteOfObject ObjectOfUrl={state.search.sprites.other['official-artwork']} title={'official-artwork'}/>
				{/* <VersionSprites pokemon={state.pokemon}/> */}
				{/* <PokemonLegendaryState pokemon={state.pokemon}/> */}
				{/* <PokemonMythicalState pokemon={state.pokemon}/> */}
				{/* <PokemonNumber pokemon={state.pokemon} pokedex={'national'}/> */}
				{/* <PokemonName pokemon={state.pokemon} language={state.language}/> */}
				{/* <PokemonDescription pokemon={state.pokemon} language={state.language}/> */}
			</div>
		</div>
	);
};

export default App;
