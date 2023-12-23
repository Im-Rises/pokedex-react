import './app.scss';
import React, {useEffect, useState} from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';
import {PokemonList} from './pages/PokemonList.jsx';
import {CodeKeyboardInputsEasterEgg} from './components/CodeKeyboardInputsEasterEgg/CodeKeyboardInputsEasterEgg.jsx';
import konamicode from './constants/code-easteregg.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PokemonDetails} from './pages/PokemonDetails.jsx';
import {getListOfPkmAvailable} from './requests/pokedex-request.js';
import {MAX_PKM} from './constants/pokedex-constant.js';
import {pipe, pluck, prop} from 'ramda';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);
	const [pokemonNameUrl, setPokemonNameUrl] = useState(null);
	const [pokemonList, setPokemonList] = useState(['']);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setPokemonNameUrl(urlParams.get('pokemon'));

		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, [window.location.search]);

	if (pokemonNameUrl) {
		return <PokemonDetails exitDetailsPage={() => {}} name={pokemonNameUrl} pokemonList={pokemonList}/>;
	}

	return (
		<div className={'app-main'}>
			<PokeOpening handleHasOpened={() => setIsOpeningClicked(true)} hasClicked={isOpeningClicked}/>
			<PokemonList/>
			<CodeKeyboardInputsEasterEgg code={konamicode} actionOnEasterEgg={() => {
				toast('Easter Egg 1 found! Or should I say... Easter Pkm Egg?', {
					type: 'success',
					autoClose: 5000,
					icon: '🥚',
					closeOnClick: true,
					pauseOnHover: false,
				});
			}}/>
			<ToastContainer/>
		</div>
	);
};

export default App;
