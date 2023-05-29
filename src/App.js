import React, {useEffect, useState} from 'react';
import './App.scss';
import getAllFromPokemon from './requests';
import {getListOfPkmAvailable} from './requests/pokedex-request';

const MAX_PKM = 1281;

const App = () => {
	const defaultState = {
		pokemonName: '',
		officialArtwork: '',
		icon: '',
		type: '',
		flavourEntries: '',
		pokemonNumber: undefined,
	};
	const [state, setState] = useState(defaultState);

	const handleValuesFetched = values => setState({...state, ...values});

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		getAllFromPokemon(state.pokemonName)
			.then(handleValuesFetched);

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
