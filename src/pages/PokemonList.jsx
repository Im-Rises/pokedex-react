import React, {useEffect, useMemo, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {List} from '../components/List.jsx';
import {pipe, pluck, prop} from 'ramda';
import getAllFromPokemon from '../requests/index.js';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemon, setPokemon] = useState({
		select: '',
		search: '',
	});

	const handlePokemonSelect = select => setPokemon({...pokemon, select});

	const handlePokemonSearch = search => setPokemon({...pokemon, search});

	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, []);

	useEffect(() => {
		getAllFromPokemon(pokemon.select).then(setPokemon);
	}, [pokemon.select]);

	return <div className={'content'}>
		<div className={'left'}>
			<div>
				{pokemon.select}
			</div>
			<div>
				<img src={pokemon.officialArtwork} alt={'officiaal artwork'}/>
			</div>
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} />
			<div className={'list-content'}>
				<List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>
			</div>
		</div>
	</div>;
};

