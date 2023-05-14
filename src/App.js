import React from 'react';
import './App.scss';
import {
	getPokemonFlavourEntryWithVersion,
	getPokemonTypes,
} from './requests/pokemon-request';
import {getPokemonNumber} from './requests/pokedex-request';

console.log(getPokemonTypes('charizard').then(console.log));
console.log(getPokemonNumber('charizard').then(console.log));
console.log(getPokemonFlavourEntryWithVersion('charizard', 'flavorText').then(console.log));

const App = () =>
// const defaultState = {
// 	pokemonName: '',
// 	result: '',
// };
// const [state, setState] = useState(defaultState);
//
// const handleResults = searchResult => setState({...state, searchResult});
//
// const handleSearch = event => setState({...state, pokemonName: event.target.value});
//
// const jsonify = data => data.json();
//
// useEffect(() => {
// 	// todo : voir pour les err 404 (axios)
// 	getPokemon(state.pokemonName).then(jsonify).then(handleResults);
// }, [state.pokemonName]);

	(<div>
		{/* <input type={'search'} value={state.pokemonName} onChange={handleSearch}/> */}
		{/* results: */}
		{/* <p>{JSON.stringify(state)}</p> */}
	</div>);
export default App;
