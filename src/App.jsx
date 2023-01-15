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
	const [state, setState] = useState({pokemon: String, language: 'en'});

	const handlePokemon = event => setState({...state, pokemon: event.target.value.toLowerCase()});
	const handleLanguage = lang => setState({...state, language: lang});

	return (
		<div>
			<form>
				<LanguageSelector initLanguage={state.language} setLanguage={handleLanguage}/>
				<input type={'text'} value={state.pokemon} onChange={handlePokemon} />
			</form>
			<div>
				<CommonSprites pokemon={state.pokemon}/>
				<DreamWorldSprites pokemon={state.pokemon}/>
				<HomeSprites pokemon={state.pokemon}/>
				<OfficialArtworkSprites pokemon={state.pokemon}/>
				<VersionSprites pokemon={state.pokemon}/>
				<PokemonLegendaryState pokemon={state.pokemon}/>
				<PokemonMythicalState pokemon={state.pokemon}/>
				<PokemonNumber pokemon={state.pokemon} pokedex={'national'}/>
				<PokemonName pokemon={state.pokemon} language={state.language}/>
				<PokemonDescription pokemon={state.pokemon} language={state.language}/>
			</div>
		</div>
	);
};

export default App;
