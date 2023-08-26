import './App.scss';
import getAllFromPokemon from './requests';
import {getListOfPkmAvailable} from './requests/pokedex-request';
import {MAX_PKM} from './constants/pokedex-constant';
import {useState, useEffect} from 'react';

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
	const [pokemonList, setPokemonList] = useState([]);

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		getAllFromPokemon(state.pokemonName)
			.then(setState);

		getListOfPkmAvailable(MAX_PKM).then(setPokemonList);
	}, [state.pokemonName]);

	return (<div>
		<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
		results:
		<img src={state.officialArtwork} alt={'official-artwork'}/>
		<img src={state.icon} alt={'icon'}/>
		<p>{JSON.stringify(state)}</p>);
		<p>{JSON.stringify(pokemonList)}</p>
	</div>);
};

export default App;
