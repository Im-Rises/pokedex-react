import React, {useState} from 'react';
import VersionSprites from './App/Components/Sprites/VersionSprites';
import CommonSprites from './App/Components/Sprites/CommonSprites';
import DreamWorldSprites from './App/Components/Sprites/DreamWorldSprites';
import HomeSprites from './App/Components/Sprites/HomeSprites';
import OfficialArtworkSprites from './App/Components/Sprites/OfficialArtworkSprites';
import LegendaryState from './App/Components/Descriptions/LegendaryState';
import MythicalState from './App/Components/Descriptions/MythicalState';

const App = () => {
	const [pokemon, setPokemon] = useState('');

	const handleSearch = event => setPokemon(event.target.value.toLowerCase());

	return (
		<div>
			<input type={'text'} value={pokemon} onChange={handleSearch}/>
			<CommonSprites pokemon={pokemon}/>
			<DreamWorldSprites pokemon={pokemon}/>
			<HomeSprites pokemon={pokemon}/>
			<OfficialArtworkSprites pokemon={pokemon}/>
			<VersionSprites pokemon={pokemon}/>
			<LegendaryState pokemon={pokemon}/>
			<MythicalState pokemon={pokemon}/>
		</div>
	);
};

export default App;
