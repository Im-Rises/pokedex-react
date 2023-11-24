import './app.scss';
import React from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';
import {PokemonList} from './pages/PokemonList.jsx';
import {CodeKeyboardInputsEasterEgg} from './components/CodeKeyboardInputsEasterEgg/CodeKeyboardInputsEasterEgg.jsx';
import konamicode from './constants/code-easteregg.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);

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
