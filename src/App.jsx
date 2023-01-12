import {SpritesFromPokemon} from './App/Components/SpritesFromPokemon';
import {useState} from 'react';

const App = () => {
	const [search, setSearch] = useState('');

	const handleSearch = event => setSearch(event.target.value);

	return <div>
		{/* eslint-disable-next-line react/react-in-jsx-scope */}
		<input type={'text'} value={search} onChange={handleSearch}/>
		{/* eslint-disable-next-line react/react-in-jsx-scope */}
		<SpritesFromPokemon pokemon={search}/>
	</div>;
};

export default App;
