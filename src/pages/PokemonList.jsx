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
		officialArtwork: '',
		listShows: [''],
	});

	const handlePokemonSelect = select =>
		setChoice({...choice, select});
	const handlePokemonSearch = event =>
		setChoice({...choice, search: event.target.value});

	const handleOfficialArtwork = ({officialArtwork}) =>
		setChoice({...choice, officialArtwork});

	const defaultPokemonSet = () =>
		setChoice({
			...choice,
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
		const {select} = choice;
		if (select) {
			getAllFromPokemon(select)
				.then(handleOfficialArtwork);
			console.log(select);
		}
	}, [choice.select]);

	// manage search
	useEffect(() => {
		const {search} = choice;
		if (search === '') {
			return defaultPokemonSet();
		}

		const timer = setTimeout(() => {
			const listShows = pokemonList
				.filter(pkm => pkm.includes(search))
				.sort((a, b) => a.length - b.length);
			const select = choice.listShows[0];
			setChoice({...choice, listShows, select});
		}, 200);
		return () => clearTimeout(timer);
	}, [choice.search]);

	return <div className={'content'}>
		<div className={'left'}>
			<div className={'pokemon-name'}>
				{choice.select}
			</div>
			<div className={'pokemon-artwork'}>
				<img src={choice.officialArtwork} alt={'official artwork'}/>
			</div>
		</div>
		<div className={'right'}>
			<input type={'search'} className={'search-bar'} value={choice.search} onChange={handlePokemonSearch} />
			<div className={'list-content'}>
				{choice.search && choice.listShows.length
					? <List stringList={choice.listShows} handleStringSelected={handlePokemonSelect}/>
					: <List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>
				}
			</div>
		</div>
	</div>;
};

