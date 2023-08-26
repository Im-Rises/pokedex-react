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
		listShows: [],
	});

	const handlePokemonSelect = select => setPokemon({...pokemon, select});

	const handlePokemonSearch = event => setPokemon({...pokemon, search: event.target.value});

	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, []);

	useEffect(() => {
		getAllFromPokemon(pokemon.select).then(setPokemon);
	}, [pokemon.select]);

	useEffect(() => {
		const listShows = pokemonList.filter(pkm => pkm.includes(pokemon.search));
		setPokemon({...pokemon, listShows});
	}, [pokemon.search]);

	return <div className={'content'}>
		<div className={'left'}>
			<div>
				{pokemon.select}
			</div>
			<div>
				<img src={pokemon.officialArtwork} alt={'official artwork'}/>
			</div>
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} value={pokemon.search} onChange={handlePokemonSearch} />
			<div className={'list-content'}>
				{pokemon.search
					? <List stringList={pokemon.listShows} handleStringSelected={handlePokemonSelect}/>
					: <List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>}
			</div>
		</div>
	</div>;
};

