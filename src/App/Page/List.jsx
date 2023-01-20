import React, {useEffect, useState} from 'react';
import {getAllInfoOfPokemon, makeRequest} from '../Requests';
import TuneIcon from '@mui/icons-material/Tune';
import {COLOR_BY_TYPES, MAX_PKM} from '../Constants/constant';
import {ListPkm} from '../Components/List/ListPkm';

export const List = () => {
	const [state, setState] = useState({search: '', show: {url: '', types: []}, pkmList: []});

	const handlePokemonToShow = ({target: {value}}) => setState({...state, pokemonToShow: value});

	const handleSearchPkm = ({target: {value}}) => setState({...state, search: value});
	const handleShow = show => setState({...state, show});

	const handlePkmList = pkmList => setState({...state, pkmList});

	const isStrIncludeSubsStr = subStr => str => str.includes(subStr);

	const searchPokemon = pkm => state.pkmList.filter(([pkmList]) => isStrIncludeSubsStr(pkm)(pkmList));

	useEffect(() => {
		getAllInfoOfPokemon(state.pokemonToShow)
			.then(({sprites: {other}, types}) => ({
				url: other['official-artwork'].front_default,
				types: types.map(({type}) => type.name),
			}))
			.then(handleShow);

		makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_PKM}`)
			.then(({results}) => results)
			.then(res => res.map(({name}, id) => [name, id]))
			.then(handlePkmList);
	}, [state.pokemonToShow, MAX_PKM]);

	const pokemonNameStyle = {
		background: state.show.types.length === 1
			? COLOR_BY_TYPES[state.show.types[0]]
			: `linear-gradient(0deg, ${COLOR_BY_TYPES[state.show.types[1]]} 0%, ${COLOR_BY_TYPES[state.show.types[1]]} 0%, ${COLOR_BY_TYPES[state.show.types[0]]} 100%)`,
	};

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
