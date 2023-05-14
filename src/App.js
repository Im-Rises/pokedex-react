import React from 'react';
import './App.scss';
import {getPokemonFlavorText, getPokemonTypes} from './request/pokemon-request';
import {getPokemonNumber} from './request/pokedex-request';

console.log(getPokemonTypes('charizard').then(console.log));
console.log(getPokemonFlavorText('charizard').then(console.log));
console.log(getPokemonNumber('charizard').then(console.log));

const App = () => (
	<div className='App'>
		<header className='App-header'>
			<p>
                Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className='App-link'
				href='https://reactjs.org'
				target='_blank'
				rel='noopener noreferrer'
			>
                Learn React
			</a>
		</header>
	</div>
);

export default App;
