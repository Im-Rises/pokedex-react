import React, {useEffect, useMemo, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';

import './PokemonList.scss';
import {List} from '../components/PokemonList/List.jsx';
import {pipe, pluck, prop, tap} from 'ramda';
import {getAllFromPokemon} from '../requests/index.js';
import {PokemonDetails} from './PokemonDetails.jsx';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const [isPokemonDetailsOpen, setIsPokemonDetailsOpen] = useState(false);
	const [pokemonList, setPokemonList] = useState(['']);
	const [pokemon, setPokemon] = useState({
		select: '',
		search: '',
		officialArtwork: '',
		listShows: [''],
	});

	const toggleViewDetails = () => setIsPokemonDetailsOpen(!isPokemonDetailsOpen);

	const handlePokemonSelect = select => setPokemon({...pokemon, select});

	const handlePokemonSearch = event => setPokemon({...pokemon, search: event.target.value});

	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(tap(setPokemonList)).then(list => handlePokemonSelect(list[0]));
	}, []);

	useEffect(() => {
		if (pokemon.select) {
			getAllFromPokemon(pokemon.select)
				.then(({officialArtwork}) => setPokemon({...pokemon, officialArtwork}));
		}
	}, [pokemon.select]);

	useEffect(() => {
		const listShows = pokemonList
			.filter(pkm => pkm.includes(pokemon.search))
			.sort((a, b) => a.length - b.length);

		if (pokemon.search && listShows.length) {
			setPokemon({...pokemon, listShows, select: listShows[0]});
		} else {
			setPokemon({...pokemon, listShows, select: pokemonList[0]});
		}
	}, [pokemon.search]);

	return (
		<>
			<div className={'content'}>
				<div className={'left'}>
					<div>
                        pokemon : {pokemon.select}
					</div>
					<div>
						<img src={pokemon.officialArtwork} alt={'official artwork'}/>
					</div>
					<button onClick={toggleViewDetails}>View details</button>
				</div>
				<div className={'right'}>
					<input type={'search'} className={'search-bar'} value={pokemon.search}
						onChange={handlePokemonSearch}/>
					<div className={'list-content'}>
						{pokemon.search && pokemon?.listShows.length
							? <List stringList={pokemon.listShows} handleStringSelected={handlePokemonSelect}/>
							: <List stringList={pokemonList} handleStringSelected={handlePokemonSelect}/>
						}
					</div>
				</div>
			</div>
			{isPokemonDetailsOpen
                && (
			// Don't be angry it is just a test until the next meeting ;)
                	<div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '10'}}>
                		<PokemonDetails name={pokemon.select}/>
                		<button style={{position: 'absolute', top: 0, right: 0}}
                			onClick={toggleViewDetails}>Close
                		</button>
                	</div>
                )
			}
		</>
	);
};

