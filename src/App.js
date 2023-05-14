import React, {useEffect, useState} from 'react';
import './App.scss';
import {getArtwork, getPokemon} from './request/pokemon-request';

const App = () => {
	const defaultState = {
		pokemonName: '',
		officialArtwork: '',
	};
	const [state, setState] = useState(defaultState);

	const handleOfficialArtwork = officialArtwork => setState({...state, officialArtwork});

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		// todo : voir pour les err 404 (axios)
		getPokemon(state.pokemonName)
			.then(getArtwork(handleOfficialArtwork));
	}, [state.pokemonName]);

	return (<div>
		<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
        results:
		<img src={state.officialArtwork} alt={''}/>
		<p>{JSON.stringify(state)}</p>
	</div>);
};

export default App;
