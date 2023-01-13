import React from 'react';
import {useState} from 'react';
import CommonSprites from './App/Components/Sprites/CommonSprites';

const App = () => {
	const [pokemon, setPokemon] = useState('');

	const handleSearch = event => setPokemon(event.target.value);

	return (
		<div>
			<input type={'text'} value={pokemon} onChange={handleSearch}/>
			<CommonSprites pokemon={pokemon.toLowerCase()}/>
		</div>
	);
};

export default App;
