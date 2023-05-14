import React, {useEffect, useState} from 'react';
import './App.scss';
import {getArtwork, getIcon, getListOfPkmAvailable, getPokemon} from './request/pokemon-request';
import {getPokemonFlavourEntryWithVersion, getPokemonTypes} from './requests/pokemon-request';
import {getPokemonNumber} from './requests/pokedex-request';

const MAX_PKM = 1281;
const App = () => {
	const defaultState = {
		pokemonName: '',
		officialArtwork: '',
		icon: '',
		type: '',
	};
	const [state, setState] = useState(defaultState);

	// handlers
	const handleOfficialArtwork = officialArtwork => setState({...state, officialArtwork});
	const handleIcon = icon => setState({...state, icon});
	const handleSearch = event => setState({...state, pokemonName: event.target.value});
	const handleType = type => setState({...state, type});
	const handleFlavourEntries = flavourEntries => setState({...state, flavourEntries});

	console.log(getPokemonNumber('charizard').then(console.log));
	useEffect(() => {
		// todo : voir pour les err 404 (axios)
		getPokemon(state.pokemonName)
			.then(getArtwork(handleOfficialArtwork))
			.then(getIcon(handleIcon))
			.then(getPokemonTypes(handleType))
			.then(getPokemonFlavourEntryWithVersion(handleFlavourEntries));

		getListOfPkmAvailable(MAX_PKM).then(console.log);
	}, [state.pokemonName]);

	return (<div>
		<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
        results:
		<img src={state.officialArtwork} alt={'official-artwork'}/>
		<img src={state.icon} alt={'icon'}/>
		<p>{JSON.stringify(state)}</p>);
	</div>);
};

export default App;
