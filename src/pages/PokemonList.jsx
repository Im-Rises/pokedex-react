import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {List} from '../components/List.jsx';
import * as R from 'ramda';

export const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState([]);

	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(({results}) => R.pluck('name', results))
			.then(R.tap(console.log))
			.then(setPokemonList);
	}, []);

	return <div className={'content'}>
		<div className={'left'}>
            left
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} />
			<div className={'list-content'}>
				<List stringList={pokemonList}/>
			</div>
		</div>
	</div>;
};

