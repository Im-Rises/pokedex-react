import React, {useEffect, useState} from 'react';
import {getListOfPkmAvailable} from '../requests/pokedex-request.js';
import {MAX_PKM} from '../constants/pokedex-constant.js';
import pokeballLoadingImage from '../images/loading/pokeball-loading-150x150.gif';
import './PokemonList.scss';
import {pipe, pluck, prop} from 'ramda';
import {getAllFromPokemon, getPokemon} from '../requests/index.js';
import {PokemonDetails} from './PokemonDetails.jsx';
import {PokemonListComponent} from '../components/PokemonList/PokemonListComponent.jsx';
import {easterEggPokemonData} from '../constants/pokemon-data-fetch.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LazyLoadImage from '../components/LazyLoadImage/LazyLoadImage.jsx';
import {getArtwork} from '../requests/pokemon-request.js';
import PokemonLogo from '../images/logo/logo-pokedex.png';

const getAllPokemonName = pipe(prop('results'), pluck('name'));

const imageLinkGetter = link => new Promise(resolve => {
	resolve(link);
});

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

	const handlePokemonSelect = select =>
		setPokemon({...pokemon, select});

	const toggleViewDetails = () =>
		setIsPokemonDetailsOpen(!isPokemonDetailsOpen);

	const handlePokemonSearch = event =>
		setPokemon({...pokemon, search: event.target.value});

	const handleOfficialArtwork = ({officialArtwork}) =>
		setPokemon({...pokemon, officialArtwork});

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
		if (select) {
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
			console.log('Easter Egg found! Or should I say... Easter Pkm Egg?');
			toast('Easter Egg found! Or should I say... Easter Pkm Egg?',
				{type: 'success', autoClose: 5000, icon: '🥚', closeOnClick: true, pauseOnHover: false});
			setPokemon({
				...pokemon,
				listShows: [search],
				select: search,
				officialArtwork: easterEggPokemonData.find(pkm => pkm.pokemonName === search).officialArtwork,
			});
			return;
		}

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
			selectedPokemonName={pokemon.select}/>;

	return (
		<>
			<div className={'pokemon-list-panel'}>
				<div className={'left'}>
					{pokemon.select
						? <div className={'pokemon-name'}>{pokemon.select} </div>
						: <img className={'pokedex-logo'} src={PokemonLogo} alt={'pokedex'}/>
					}
					<div className={'pokemon-artwork-holder'}>
						{pokemon.select
							? <LazyLoadImage imageGetter={() => getPokemon(pokemon.select).then(getArtwork)} />
							: <div className={'pokedex-description'}>
								Welcome to the Pokédex, your ultimate Pokémon companion! Our user-friendly interface makes it easy to explore and learn about your favorite Pokémon.

								Here's how it works:

								<ol>
									<li><b>Pokémon Gallery : </b> On the right, you'll find a list of all available Pokémon. Simply click on any Pokémon to view its full-size image.</li>
									<li><b>Detailed Information: </b> Below the Pokémon image, you'll discover a button to access detailed information. Click it, and you'll uncover a wealth of knowledge about the selected Pokémon, including its abilities, type, and much more!</li>
									<li><b>Search Feature : </b> Looking for a specific Pokémon? No problem! Use the search bar in the top-right corner to quickly find the Pokémon you're interested in.</li>
									<li><b>Region-specific Details : </b> Dive deeper into the world of Pokémon by exploring region-specific information. Discover the habitat, behaviors, and unique characteristics of each Pokémon based on their region of origin.</li>
								</ol>

								The Pokédex is your gateway to the fascinating world of Pokémon. Explore, learn, and embark on your journey to become a Pokémon Master!

								<p>								pssst there's an easter egg, use their name to see it!
									<div className={'github-contributors'}>
										<a href={'https://github.com/clementreiffers'} className={'github-pdp-link'}>
											<figure>
												<LazyLoadImage
													imageGetter={() => imageLinkGetter('https://avatars.githubusercontent.com/u/44473020?v=4')}
													className={'github-pdp'}/>
												<figcaption>Clément Reiffers</figcaption>
											</figure>
										</a>
										<a href={'https://github.com/clementreiffers'} className={'github-pdp-link'}>
											<figure>
												<LazyLoadImage
													imageGetter={() => imageLinkGetter('https://avatars.githubusercontent.com/u/59691442?v=4')}
													className={'github-pdp'}/>
												<figcaption>Quentin Morel</figcaption>
											</figure>
										</a>
									</div>
								</p>
							</div>
						}
					</div>
					<div className={'pokemon-view-details-button-holder'}>
						{pokemon.select && <button onClick={toggleViewDetails}>View details</button>}
					</div>
				</div>
				<div className={'right'}>
					<input type={'search'} className={'search-bar'} value={pokemon.search}
						onChange={handlePokemonSearch} autoFocus={true}/>
					<div className={'list-content'}>
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
                		<PokemonDetails name={pokemon.select} exitDetailsPage={toggleViewDetails}/>
                	</div>
                )
			}
			<ToastContainer/>
		</>);
};
