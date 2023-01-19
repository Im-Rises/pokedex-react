import React, {useEffect, useState} from 'react';
import {getSprites, makeRequest} from '../Requests';
import TuneIcon from '@mui/icons-material/Tune';
import {MAX_PKM} from '../Constants/constant';
import {ListPkm} from '../Components/List/ListPkm';

export const List = () => {
	const [state, setState] = useState({search: '', pokemonToShow: '', imageToShow: '', pkmList: []});

	const handlePokemonToShow = ({target: {value}}) => setState({...state, pokemonToShow: value});

	const handleImageToShow = imageToShow => setState({...state, imageToShow});

	const handleSearchPkm = ({target: {value}}) => setState({...state, search: value});

	const handlePkmList = pkmList => setState({...state, pkmList});

	const isStrIncludeSubsStr = subStr => str => str.includes(subStr);

	const searchPokemon = pkm => state.pkmList.filter(([pkmList]) => isStrIncludeSubsStr(pkm)(pkmList));

	console.log(searchPokemon(state.search));

	useEffect(() => {
		getSprites(state.pokemonToShow)
			.then(({other}) => other['official-artwork'].front_default)
			.then(handleImageToShow);

		makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_PKM}`)
			.then(({results}) => results)
			.then(res => res.map(({name}, id) => [name, id]))
			.then(handlePkmList);
	}, [state.pokemonToShow, MAX_PKM]);

	return <div>
		<div className={'name-searchbar'}>
			<div className={'pokemon-name'}><p>{state.pokemonToShow}</p></div>
			<div className={'pokemon-name'}>
				<input type={'search'} onChange={handleSearchPkm} value={state.search}/>
				<TuneIcon/>
			</div>
		</div>
		<div className={'list-and-preview'}>
			<div className={'left'}>
				<div className={'left-content'}>
					<img src={state.imageToShow} alt={''}/>
				</div>
			</div>
			<div className={'right'}>
				<ListPkm handlePokemonToShow={handlePokemonToShow} listOfPkm={searchPokemon(state.search)}/>
			</div>
		</div>
	</div>;
};
