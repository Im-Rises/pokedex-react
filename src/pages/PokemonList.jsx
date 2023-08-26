import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';

export const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState([]);

	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM).then(setPokemonList);
	}, []);

	return <>
		<div className={'left'}>
            left
		</div>
		<div className={'right'}>
			{pokemonList.results && pokemonList.results.map(
				({name}, key) => <div key={key} className={'pokemon-elem'}>{name}</div>,
			)}
		</div>
	</>;
};

