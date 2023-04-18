import React, {useEffect, useState} from 'react';
import {getAllInfoOfPokemon, makeRequest} from '../Requests';
import TuneIcon from '@mui/icons-material/Tune';
import {COLOR_BY_TYPES, MAX_PKM, POKEPEDIA_URL} from '../Constants/constant';
import {ListPkm} from '../Components/List/ListPkm';

const defaultState = {
	search: '',
	show: {url: '', types: []},
	pkmList: [],
	pokemonToShow: '',
	pokemonSpecies: '',
};

export const List = () => {
	const [state, setState] = useState(defaultState);

	const handlePokemonToShow = ({target: {value}}) => setState({...state, pokemonToShow: value});

	const handleSearchPkm = ({target: {value}}) => setState({...state, search: value});
	const handleShow = show => setState({...state, show});

	const handlePkmList = pkmList => setState({...state, pkmList});

	const isStrIncludeSubsStr = subStr => str => str.includes(subStr);

	const searchPokemon = pkm => state.pkmList.filter(([pkmList]) => isStrIncludeSubsStr(pkm)(pkmList));

	const handleSearchSpecie = pokemonSpecies => setState({...state, pokemonSpecies});

	const getArtworkSpriteToShow = pkm => getAllInfoOfPokemon(pkm)
		.then(({sprites: {other}, types}) => ({
			url: other['official-artwork'].front_default,
			types: types.map(({type}) => type.name),
		}));

	const getListOfPkmAvailable = nbr => makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${nbr}`)
		.then(({results}) => results)
		.then(res => res.map(({name}, id) => [name, id]));

	const getDescriptionPkmToShow = pkm => makeRequest(`${POKEPEDIA_URL}/pokemon-species/${pkm}`);

	const getColorType = type => COLOR_BY_TYPES[type];

	const createLinearGradient = ([t1, t0]) =>
		`linear-gradient(0deg, ${getColorType(t1)} 0%, ${getColorType(t1)} 0%, ${getColorType(t0)} 100%)`;

	const pokemonNameStyle = {
		background: state.show.types.length === 1
			? getColorType(state.show.types[0])
			: createLinearGradient(state.show.types),
	};

	useEffect(() => {
		getArtworkSpriteToShow(state.pokemonToShow)
			.then(handleShow);

		getListOfPkmAvailable(MAX_PKM)
			.then(handlePkmList);

		getDescriptionPkmToShow(state.pokemonToShow)
			.then(handleSearchSpecie);
	}, [state.pokemonToShow, MAX_PKM]);

	return <div>
		<div className={'name-searchbar'}>
			<div className={'pokemon-name'} style={pokemonNameStyle}>
				<p>{state.pokemonToShow}</p>
			</div>
			<div className={'pokemon-name'}>
				<input type={'search'} onChange={handleSearchPkm} value={state.search}/>
				<TuneIcon/>
			</div>
		</div>
		<div className={'list-and-preview'}>
			<div className={'left'}>
				<div className={'left-content'}>
					<img src={state.show.url} alt={''}/>
					<p className={'pokemon-descr'}>
                        PUT THE DESCRIPTION OF THE POKEMON HERE
					</p>
				</div>
			</div>
			<div className={'right'}>
				<ListPkm handlePokemonToShow={handlePokemonToShow} listOfPkm={searchPokemon(state.search)}/>
			</div>
		</div>
	</div>;
};
