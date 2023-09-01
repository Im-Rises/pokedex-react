import './App.scss';
import React from 'react';
import PokeOpening from './components/Opening/PokeOpening.jsx';

const App = () => {
	const [isClicked, setIsClicked] = React.useState(false);

	return (
		<div>
			{/* <PokemonList/>, */}
			{/* <PokemonDetails name={'bulbasaur'}/>, */}
			<PokeOpening handleHasOpened={() => setIsClicked(true)} hasClicked={isClicked}/>
		</div>
	);
};

export default App;
