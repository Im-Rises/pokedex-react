import './app.scss';
import React, {useEffect, useState} from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';
import {PokemonList} from './pages/PokemonList.jsx';
import {CodeKeyboardInputsEasterEgg} from './components/CodeKeyboardInputsEasterEgg/CodeKeyboardInputsEasterEgg.jsx';
import konamicode from './constants/code-easteregg.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PokemonDetails} from './pages/PokemonDetails.jsx';

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);
	const [pokemonNameUrl, setPokemonNameUrl] = useState(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setPokemonNameUrl(urlParams.get('pokemon'));
	}, [window.location.search]);

	if (pokemonNameUrl) {
		return <PokemonDetails exitDetailsPage={() => {}} name={pokemonNameUrl} pokemonList={['']}/>;
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
