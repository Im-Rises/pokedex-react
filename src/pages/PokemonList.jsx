import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {pipe, pluck, prop} from 'ramda';
import {getAllFromPokemon, uppercaseFirstLetter} from '../requests/index.js';
import {PokemonDetails} from './PokemonDetails.jsx';
import {PokemonListComponent} from '../components/PokemonList/PokemonListComponent.jsx';
import {clementPokemonData, quentinPokemonData} from '../constants/pokemon-data-fetch.js';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const [isPokemonDetailsOpen, setIsPokemonDetailsOpen] = useState(false);
	const [pokemonList, setPokemonList] = useState(['']);
	const [pokemon, setPokemon] = useState({
		select: '', search: '', officialArtwork: '', listShows: [''],
	});

	const handlePokemonSelect = select =>
		setPokemon({...pokemon, select});

	const toggleViewDetails = () =>
		setIsPokemonDetailsOpen(!isPokemonDetailsOpen);

	const handlePokemonSearch = event =>
		setPokemon({...pokemon, search: event.target.value});

	const handleOfficialArtwork = ({officialArtwork}) =>
		setPokemon({...pokemon, officialArtwork});

	const defaultPokemonSet = () => setPokemon({
		...pokemon, listShows: pokemonList, select: pokemonList[0],
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

		// Don't mind this code, it's juste a joke 😝
		if (search === clementPokemonData.pokemonName) {
			setPokemon({
				...pokemon,
				listShows: [clementPokemonData.pokemonName],
				select: clementPokemonData.pokemonName,
				officialArtwork: clementPokemonData.officialArtwork,
			});

			return;
		}

		// Leave this code, it's the perfection 😁
		if (search === quentinPokemonData.pokemonName) {
			setPokemon({
				...pokemon,
				listShows: [quentinPokemonData.pokemonName],
				select: quentinPokemonData.pokemonName,
				officialArtwork: quentinPokemonData.officialArtwork,
			});

			return;
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

	return (<>
		<div className={'content'}>
			<div className={'left'}>
				<div className={'pokemon-name'}>
					{pokemon.select ? uppercaseFirstLetter(pokemon.select) : 'Select a pokemon!'}
				</div>
				<div>
					{pokemon.select ? <img src={pokemon.officialArtwork} alt={'official artwork'}/> : <></>}
				</div>
				{pokemon.select && <button onClick={toggleViewDetails}>View details</button>}
			</div>
			<div className={'right'}>
				<input type={'search'} className={'search-bar'} value={pokemon.search}
					onChange={handlePokemonSearch}/>
				<div className={'list-content'}>
					{pokemon.search && pokemon?.listShows.length
						? <PokemonListComponent stringList={pokemon.listShows} handleStringSelected={handlePokemonSelect}
							selectedPokemonName={pokemon.select}/>
						: <PokemonListComponent stringList={pokemonList} handleStringSelected={handlePokemonSelect}
							selectedPokemonName={pokemon.select}/>}
				</div>
			</div>
		</div>
		{
			isPokemonDetailsOpen
            && (
            	<div style={{
            		position: 'absolute',
            		top: 0,
            		left: 0,
            		width: '100vw',
            		height: '100vh',
            		zIndex: '10',
            		margin: '0',
            		overflow: 'hidden',
            	}}>
            		<PokemonDetails name={pokemon.select}/>
            		<button style={{position: 'absolute', top: 0, right: 0}}
            			onClick={toggleViewDetails}>Close
            		</button>
            	</div>
            )
		}
	</>);
};
