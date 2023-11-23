import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';
import pokeballLoadingImage from '../images/loading/pokeball-loading-150x150.gif';
import './PokemonList.scss';
import {pipe, pluck, prop} from 'ramda';
import {getAllFromPokemon, getPokemon} from '../requests/index.js';
import {PokemonDetails} from './PokemonDetails.jsx';
import {PokemonListComponent} from '../components/PokemonList/PokemonListComponent.jsx';
import {easterEggPokemonData, easterEggPokemonDataOtherInfo} from '../constants/pokemon-easter-egg-data';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LazyLoadImage from '../components/LazyLoadImage/LazyLoadImage.jsx';
import {getArtwork} from '../requests/pokemon-request.js';
import PokemonLogo from '../images/logo/logo-pokedex.png';
import {PokemonDetailsDumb} from '../components/PokemonDetailsDumb/PokemonDetailsDumb.jsx';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

export const PokemonList = () => {
	const timeoutConstant = 200;
	const [isPokemonDetailsOpen, setIsPokemonDetailsOpen] = useState(false);
	const [pokemonList, setPokemonList] = useState(['']);
	const [pokemonSearchText, setPokemonSearchText] = useState('');
	const [pokemon, setPokemon] = useState({
		select: '', search: '', officialArtwork: pokeballLoadingImage, listShows: [''],
	});

	const [easterEggIndex, setEasterEggIndex] = useState(-1);

	const handlePokemonSelect = select => setPokemon({...pokemon, select});

	const toggleViewDetails = () => {
		setIsPokemonDetailsOpen(!isPokemonDetailsOpen);
		if (isPokemonDetailsOpen && easterEggIndex >= 0) {
			setPokemonSearchText('');
			setPokemon({...pokemon, search: '', listShows: pokemonList});
			setEasterEggIndex(-1);
		}
	};

	const handlePokemonSearch = event => {
		setPokemon({...pokemon, search: event.target.value.toLowerCase()});
		setPokemonSearchText(event.target.value);
	};

	const handleOfficialArtwork = ({officialArtwork}) => setPokemon({...pokemon, officialArtwork});

	const defaultPokemonSet = () => setPokemon({...pokemon, listShows: pokemonList});

	// get all pokemon list
	useEffect(() => {
		getListOfPkmAvailable(MAX_PKM)
			.then(getAllPokemonName)
			.then(setPokemonList);
	}, []);

	// manage select
	useEffect(() => {
		const {select} = pokemon;
		if (select && easterEggIndex < 0) {
			getAllFromPokemon(select)
				.then(handleOfficialArtwork);
		}
	}, [pokemon.select]);

	// manage search
	useEffect(() => {
		const {search} = pokemon;
		if (search === '') {
			return defaultPokemonSet();
		}

		// If one of the Pokémon Easter Egg name is entered
		if (easterEggPokemonData.some(pkm => pkm.pokemonName === search)) {
			toast('Easter Egg 1 found! Or should I say... Easter Pkm Egg?', {
				type: 'success',
				autoClose: 5000,
				icon: '🥚',
				closeOnClick: true,
				pauseOnHover: false,
			});
			setPokemon({
				...pokemon,
				listShows: [search],
				select: search,
				officialArtwork: easterEggPokemonData.find(pkm => pkm.pokemonName === search).officialArtwork,
			});

			setEasterEggIndex(easterEggPokemonData.findIndex(pkm => pkm.pokemonName === search));
			return;
		}

		setEasterEggIndex(-1);

		const timer = setTimeout(() => {
			const listShows = pokemonList
				.filter(pkm => pkm.includes(search))
				.sort((a, b) => a.length - b.length);
			const select = pokemon.listShows[0];

			setPokemon({...pokemon, listShows, select});
		}, timeoutConstant);
		return () => clearTimeout(timer);
	}, [pokemon.search]);

	const pokemonListComponentGenerator = list => <PokemonListComponent
		stringList={list}
		handleStringSelected={handlePokemonSelect}
		selectedPokemonName={pokemon.select}/>;

	return (<>
		<div className={'pokemon-list-panel'}>
			<div className={'left'}>
				<input placeholder={'search pokemon...'} type={'search'} className={'search-bar'}
					value={pokemonSearchText} onChange={handlePokemonSearch} autoFocus={true}/>
				<div className={'list-content'}>
					{
						easterEggIndex < 0 && (
							<>
								{pokemon.search && pokemonListComponentGenerator(pokemon.listShows)}
								{(!pokemon.search && pokemonList.length !== 1) && pokemonListComponentGenerator(pokemonList)}
								{/* {pokemon.search && pokemon?.listShows.length ? pokemonListComponentGenerator(pokemon.listShows) : pokemonListComponentGenerator(pokemonList)} */}
							</>
						)
					}
				</div>
			</div>
			<div className={'right'}>
				<div className={'pokemon-artwork-panel'}>
					{pokemon.select
                        && (
                        	<div className={'pokemon-name'}>{pokemon.select}
                        		<button onClick={toggleViewDetails}
                        			className={'pokemon-view-details-button-holder'}>View details
                        		</button>
                        	</div>
                        )
					}
					{pokemon.select
						? <div className={'pokemon-artwork-holder'}>
							{
								easterEggIndex < 0 && (
									<LazyLoadImage imageGetter={() => getPokemon(pokemon.select).then(getArtwork)}
										className={'pokemon-artwork'}/>
								)
							}
						</div>
						: <div className={'pokedex-description'}>
							<img className={'pokedex-logo'} src={PokemonLogo} alt={'pokedex'}/>
							<p>Welcome to the Pokédex, your ultimate Pokémon companion! Our user-friendly interface
                                makes it easy to explore and learn about your favorite Pokémon.</p>

                            The Pokédex is your gateway to the fascinating world of Pokémon. Explore, learn, and
                            embark on your journey to become a Pokémon Master!
						</div>}
				</div>
			</div>

		</div>
		{isPokemonDetailsOpen && (<>
			{easterEggIndex >= 0 ? (<PokemonDetailsDumb pokemonData={easterEggPokemonData[easterEggIndex]}
				pokemonOtherInfo={easterEggPokemonDataOtherInfo[easterEggIndex]}
				exitDetailsPage={toggleViewDetails}/>) : (
				<PokemonDetails name={pokemon.select}
					exitDetailsPage={toggleViewDetails}
					isEasterEgg={easterEggIndex >= 0}/>)}
		</>)}
		<ToastContainer/>
	</>);
};
