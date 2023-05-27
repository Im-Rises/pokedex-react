import React, {useEffect, useState} from 'react';
import './App.scss';
import {getArtwork, getIcon, getListOfPkmAvailable, getPokemon} from './request/pokemon-request';
import {getPokemonFlavourEntryWithVersion, getPokemonTypes} from './requests/pokemon-request';
import {andThen, applySpec, identity, mergeAll, pipeWith, prop} from 'ramda';
import {getPokemonNumber} from './requests/pokedex-request';

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
	// const handleFlavourEntries = flavourEntries => setState({...state, flavourEntries});

	const getAndHandleValues = async requestResult => {
		console.log('req result', requestResult);
		pipeWith(andThen)([
			getPokemonFlavourEntryWithVersion,
			applySpec({flavourEntries: identity}),
			mergeAll([{requestResult}, identity]),
			applySpec({
				officialArtwork: getArtwork,
				type: getPokemonTypes,
				icon: getIcon,
				pokemonNumber: getPokemonNumber,
				flavourEntries: prop('flavourEntries'),
			}),
			handleValuesFetched,
		])(requestResult);
		return requestResult;
	};

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		// todo : voir pour les err 404 (axios)
		getPokemon(state.pokemonName)
			.then(getAndHandleValues);

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
