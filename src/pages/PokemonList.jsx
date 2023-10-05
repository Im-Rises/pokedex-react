import React, {useEffect, useMemo, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';
import pokeballLoadingImage from '../images/loading/pokeball-loading-150x150.gif';
import './PokemonList.scss';
import {pipe, pluck, prop} from 'ramda';
import {getAllFromPokemon} from '../requests/index.js';
import {PokemonDetails} from './PokemonDetails.jsx';
import {PokemonListComponent} from '../components/PokemonList/PokemonListComponent.jsx';
import {easterEggPokemonData} from '../constants/pokemon-data-fetch.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const timeoutConstant = 200;
	const [isPokemonDetailsOpen, setIsPokemonDetailsOpen] = useState(false);
	const [pokemonList, setPokemonList] = useState(['']);
	const [pokemon, setPokemon] = useState({
		select: '',
		search: '',
		officialArtwork: pokeballLoadingImage,
		listShows: [''],
	});
	// const [easterEggActivated, setEasterEggActivated] = useState(false);

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

	// get all pokemon list
	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, []);

	// manage select
	useEffect(() => {
		// if (easterEggActivated) {
		// 	return;
		// }

		const {select} = pokemon;
		if (select) {
			getAllFromPokemon(select)
				.then(handleOfficialArtwork);
		}
	}, [pokemon.select, pokemonList]);

	// manage search
	useEffect(() => {
		const {search} = pokemon;
		if (search === '') {
			return defaultPokemonSet();
		}

		// If one of the Pokémon Easter Egg name is entered
		if (easterEggPokemonData.some(pkm => pkm.pokemonName === search)) {
			console.log('Easter Egg found! Or should I say... Easter Pkm Egg?');
			toast('Easter Egg found! Or should I say... Easter Pkm Egg?',
				{type: 'success', autoClose: 5000, icon: '🥚', closeOnClick: true, pauseOnHover: false});
			setPokemon({
				...pokemon,
				listShows: [search],
				select: search,
				officialArtwork: easterEggPokemonData.find(pkm => pkm.pokemonName === search).officialArtwork,
			});
			// setEasterEggActivated(true);
			return;
		}

		// setEasterEggActivated(false);

		const timer = setTimeout(() => {
			const listShows = pokemonList
				.filter(pkm => pkm.includes(search))
				.sort((a, b) => a.length - b.length);
			const select = pokemon.listShows[0];

			setPokemon({...pokemon, listShows, select});
		}, timeoutConstant);
		return () => clearTimeout(timer);
	}, [pokemon.search]);

	const pokemonListComponentGenerator = list =>
		<PokemonListComponent
			stringList={list}
			handleStringSelected={handlePokemonSelect}
			selectedPokemonName={pokemon.select} />;

	return (
		<>
			<div className={'pokemon-list-panel'}>
				<div className={'left'}>
					<div className={'pokemon-name'}>
						{pokemon.select ? pokemon.select : 'Select a pokemon!'}
					</div>
					<div className={'pokemon-artwork-holder'}>
						{pokemon.select ? <img src={pokemon.officialArtwork} alt={'official artwork'}/> : <></>}
					</div>
					<div className={'pokemon-view-details-button-holder'}>
						{pokemon.officialArtwork !== pokeballLoadingImage
                            && <button onClick={toggleViewDetails}>View
                                details</button>}
					</div>
				</div>
				<div className={'right'}>
					<input type={'search'} className={'search-bar'} value={pokemon.search} onChange={handlePokemonSearch} autoFocus={true}/>
					<div className={'list-content'}>
						{/* {!easterEggActivated && pokemon.search && pokemon?.listShows.length */}
						{
							pokemon.search && pokemon?.listShows.length
								? pokemonListComponentGenerator(pokemon.listShows)
								: pokemonListComponentGenerator(pokemonList)
						}
					</div>
				</div>
			</div>
			{
				isPokemonDetailsOpen
                && (
                	<div className={'pokemon-details-panel'}>
                		 <PokemonDetails name={pokemon.select}/>
                		{/* {!easterEggActivated && <PokemonDetails name={pokemon.select}/>} */}
                		{/* <button */}
                		{/*	onClick={toggleViewDetails}>Close */}
                		{/* </button> */}
                	</div>
                )
			}
			<ToastContainer/>
		</>);
};
