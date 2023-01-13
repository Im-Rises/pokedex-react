import React from 'react';
import {SpritesFromPokemon} from './App/Components/SpritesFromPokemon';
import {useState} from 'react';

const App = () => {
	const [search, setSearch] = useState('');

	const handleSearch = event => setSearch(event.target.value);

	return (
		<div>
			{ }
			<input type={'text'} value={search} onChange={handleSearch}/>
			{ }
			<SpritesFromPokemon pokemon={search}/>
		</div>
	);
};

export default App;
