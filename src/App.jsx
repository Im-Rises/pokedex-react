import React, {useEffect, useState} from 'react';
import LanguageSelector from './App/Components/Language/LanguageSelector';
import {POKEPEDIA_URL} from './App/Constants/constant';
import {makeRequest} from './App/Requests';
import SpritesObject from './App/Components/Sprites/SpritesObject';
import VersionSprites from './App/Components/Sprites/VersionSprites';
import PokemonLegendaryState from './App/Components/Descriptions/PokemonLegendaryState';
import PokemonMythicalState from './App/Components/Descriptions/PokemonMythicalState';
import PokemonNumber from './App/Components/Descriptions/PokemonNumber';
import PokemonName from './App/Components/Descriptions/PokemonName';
import PokemonDescription from './App/Components/Descriptions/PokemonDescription';

const App = () => {
	const [state, setState] = useState({
		pokemon: String,
		language: 'en',
		// eslint-disable-next-line camelcase
		search: {sprites: {other: {dream_world: {}, home: {}, 'official-artwork': {}}, versions: {}}},
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
				<SpritesObject obj={state.search.sprites} title={'common'}/>
				<SpritesObject obj={state.search.sprites.other.dream_world} title={'dream_world'}/>
				<SpritesObject obj={state.search.sprites.other.home} title={'home'}/>
				<SpritesObject obj={state.search.sprites.other['official-artwork']}
					title={'official-artwork'}/>
				<VersionSprites versions={state.search.sprites.versions}/>
				<PokemonLegendaryState pokemon={state.pokemon}/>
				<PokemonMythicalState pokemon={state.pokemon}/>
				<PokemonNumber pokemon={state.pokemon} pokedex={'national'}/>
				<PokemonName pokemon={state.pokemon} language={state.language}/>
				<PokemonDescription pokemon={state.pokemon} language={state.language}/>
			</div>
		</div>
	);
};

export default App;
