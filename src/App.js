import React, {useEffect, useState} from 'react';
import './App.scss';
import {getArtwork, getIcon, getPokemon} from './request/pokemon-request';

const App = () => {
	const defaultState = {
		pokemonName: '',
		officialArtwork: '',
		icon: '',
	};
	const [state, setState] = useState(defaultState);

	// handlers
	const handleOfficialArtwork = officialArtwork => setState({...state, officialArtwork});
	const handleIcon = icon => setState({...state, icon});
	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		// todo : voir pour les err 404 (axios)
		getPokemon(state.pokemonName)
			.then(getArtwork(handleOfficialArtwork))
			.then(getIcon(handleIcon));
	}, [state.pokemonName]);

	return (<div>
		<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
        results:
		<img src={state.officialArtwork} alt={'official-artwork'}/>
		<img src={state.icon} alt={'icon'}/>
		<p>{JSON.stringify(state)}</p>
	</div>);
};

export default App;
