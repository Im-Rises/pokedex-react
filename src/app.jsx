import './app.scss';
import React from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';
import {PokemonList} from './pages/PokemonList.jsx';
import {CodeKeyboardInputsEasterEgg} from './components/CodeKeyboardInputsEasterEgg/CodeKeyboardInputsEasterEgg.jsx';
import konamicode from './constants/code-easteregg.js';

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);

	return (
		<div className={'app-main'}>
			<PokeOpening handleHasOpened={() => setIsOpeningClicked(true)} hasClicked={isOpeningClicked}/>
			<PokemonList/>
			<CodeKeyboardInputsEasterEgg code={konamicode}/>
		</div>
	);
};

export default App;
