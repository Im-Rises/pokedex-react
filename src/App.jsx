import React, {useState} from 'react';
import VersionSprites from './App/Components/Sprites/VersionSprites';
import CommonSprites from './App/Components/Sprites/CommonSprites';
import DreamWorldSprites from './App/Components/Sprites/DreamWorldSprites';
import HomeSprites from './App/Components/Sprites/HomeSprites';
import OfficialArtworkSprites from './App/Components/Sprites/OfficialArtworkSprites';
import PokemonLegendaryState from './App/Components/Descriptions/PokemonLegendaryState';
import PokemonMythicalState from './App/Components/Descriptions/PokemonMythicalState';
import PokemonNumber from './App/Components/Descriptions/PokemonNumber';
import PokemonName from './App/Components/Descriptions/PokemonName';
import PokemonDescription from './App/Components/Descriptions/PokemonDescription';
import LanguageSelector from './App/Components/Language/LanguageSelector';

const App = () => {
	const [pokemon, setPokemon] = useState('');
	const [language, setLanguage] = useState('en');

	const handleSearch = event => setPokemon(event.target.value.toLowerCase());
	return (
		<div>
			<LanguageSelector initLanguage={language} setLanguage={setLanguage}/>
			<input type={'text'} value={pokemon} onChange={handleSearch}/>
			<CommonSprites pokemon={pokemon}/>
			<DreamWorldSprites pokemon={pokemon}/>
			<HomeSprites pokemon={pokemon}/>
			<OfficialArtworkSprites pokemon={pokemon}/>
			<VersionSprites pokemon={pokemon}/>
			<PokemonLegendaryState pokemon={pokemon}/>
			<PokemonMythicalState pokemon={pokemon}/>
			<PokemonNumber pokemon={pokemon} pokedex={'national'}/>
			<PokemonName pokemon={pokemon} language={language}/>
			<PokemonDescription pokemon={pokemon} language={language}/>
		</div>
	);
};

export default App;
