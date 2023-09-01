import './App.scss';
import React from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';

const App = () => {
	const [isOpeningClicked, setIsOpeningClicked] = React.useState(false);

	return (
		<div>
			{/* <PokemonList/>, */}
			{/* <PokemonDetails name={'bulbasaur'}/>, */}
			<PokeOpening handleHasOpened={() => setIsOpeningClicked(true)} hasClicked={isOpeningClicked}/>
		</div>
	);
};

export default App;
