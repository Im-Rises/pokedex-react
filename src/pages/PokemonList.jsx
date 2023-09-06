import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {List} from '../components/List.jsx';
import {pipe, pluck, prop} from 'ramda';
import {getAllFromPokemon} from '../requests/index.js';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState(['']);
	const [pokemon, setPokemon] = useState({
		select: '',
		search: '',
		officialArtwork: '',
		listShows: [''],
	});

	const handlePokemonSelect = select =>
		setPokemon({...pokemon, select});

	const handlePokemonSearch = event =>
		setPokemon({...pokemon, search: event.target.value});

	const handleOfficialArtwork = ({officialArtwork}) =>
		setPokemon({...pokemon, officialArtwork});

	const defaultPokemonSet = () =>
		setPokemon({
			...pokemon,
			listShows: pokemonList,
			select: pokemonList[0],
		});

	// manage list
	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, []);

	// manage select
	useEffect(() => {
		const {select} = pokemon;
		if (select) {
			getAllFromPokemon(select)
				.then(handleOfficialArtwork);
		}
	}, [pokemon.select, pokemonList, pokemon.search]);

	// manage search
	useEffect(() => {
		const {search} = pokemon;
		if (search === '') {
			return defaultPokemonSet();
		}

		const timer = setTimeout(() => {
			const listShows = pokemonList
				.filter(pkm => pkm.includes(search))
				.sort((a, b) => a.length - b.length);
			const select = pokemon.listShows[0];
			setPokemon({...pokemon, listShows, select});
		}, 200);
		return () => clearTimeout(timer);
	}, [pokemon.search]);

	return <div className={'content'}>
		<div className={'left'}>
			<div className={'pokemon-name'}>
				{pokemon.select}
			</div>
			<div className={'pokemon-artwork'}>
				<img src={pokemon.officialArtwork} alt={'official artwork'}/>
			</div>
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} value={pokemon.search} onChange={handlePokemonSearch} />
			<div className={'list-content'}>
				{pokemon.search && pokemon.listShows.length
					? <List stringList={pokemon.listShows} handleStringSelected={handlePokemonSelect}/>
					: <List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>
				}
			</div>
		</div>
	</div>;
};

