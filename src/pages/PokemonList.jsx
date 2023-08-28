import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {List} from '../components/List.jsx';
import {pipe, pluck, prop, tap} from 'ramda';
import {getAllFromPokemon} from '../requests/index.js';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState(['']);
	const [choice, setChoice] = useState({
		select: '',
		search: '',
	});
	const [pokemon, setPokemon] = useState({
		officialArtwork: '',
		listShows: [''],
	});

	const handlePokemonSelect = select =>
		setChoice({...choice, select});
	const handlePokemonSearch = event =>
		setChoice({...choice, search: event.target.value});

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
		if (pokemon.select) {
			getAllFromPokemon(pokemon.select)
				.then(handleOfficialArtwork);
		}
	}, [pokemon.select]);

	// manage search
	useEffect(() => {
		if (choice.search === '') {
			return defaultPokemonSet();
		}

		const timer = setTimeout(() => {
			const listShows = pokemonList
				.filter(pkm => pkm.includes(choice.search))
				.sort((a, b) => a.length - b.length);
			const select = pokemon.listShows[0];
			setPokemon({...pokemon, listShows, select});
		}, 200);
		return () => clearTimeout(timer);
	}, [choice.search]);

	return <div className={'content'}>
		<div className={'left'}>
			<div className={'pokemon-name'}>
				pokemon : {pokemon.select}
			</div>
			<div>
				<img src={pokemon.officialArtwork} alt={'official artwork'} className={'official-artwork'}/>
			</div>
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} value={choice.search} onChange={handlePokemonSearch} />
			<div className={'list-content'}>
				{choice.search && pokemon.listShows.length
					? <List stringList={pokemon.listShows} handleStringSelected={handlePokemonSelect}/>
					: <List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>
				}
			</div>
		</div>
	</div>;
};

