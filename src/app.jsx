import './App.scss';
import React from 'react';
import {getAllFromPokemon} from './requests';
import {getListOfPkmAvailable} from './requests/pokedex-request';
import {MAX_PKM} from './constants/pokedex-constant';
import {useState, useEffect} from 'react';
import {pokemonDataModel} from './constants/pokemon-data-fetch.js';

const App = () => {
	const [state, setState] = useState(pokemonDataModel);
	const [pokemonList, setPokemonList] = useState([]);

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		getAllFromPokemon(state.pokemonName)
			.then(setState);

		getListOfPkmAvailable(MAX_PKM).then(setPokemonList);
	}, [state.pokemonName]);

	return (
		<div>
			<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
            results:
			<img src={state.officialArtwork} alt={'official-artwork'}/>
			<img src={state.icon} alt={'icon'}/>
			<p>{JSON.stringify(state)}</p>);
			<p>{JSON.stringify(pokemonList)}</p>
		</div>
	);
};

export default App;
