import './app.scss';
import React from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';
import {PokemonList} from './pages/PokemonList.jsx';

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);

	return (
		<div>
			<PokeOpening handleHasOpened={() => setIsOpeningClicked(true)} hasClicked={isOpeningClicked}/>
			<PokemonList/>,
		</div>
	);
};

export default App;
