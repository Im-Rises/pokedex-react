import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import {PokemonList} from './pages/PokemonList.jsx';
import {PokemonDetails} from './pages/PokemonDetails.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<PokemonDetails name={'pikachu'}/>,
	// <PokemonList/>,
);
