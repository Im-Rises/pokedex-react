import React, {useEffect, useState} from 'react';
import {getAllInfoOfPokemon, makeRequest} from '../../Requests';
import PropTypes from 'prop-types';
import {PkmMemberList} from './PkmMemberList';

export const ListPkm = ({nbrOfPkm, handlePokemonToShow, pokemon}) => {
	const [state, setState] = useState({pkmList: []});

	const handlePkmList = pkmList => setState({...state, pkmList});

	const emptyPkmList = () => setState({...state, pkmList: []});

	useEffect(() => {
		if (!pokemon || pokemon === '') {
			makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${nbrOfPkm}`)
				.then(({results}) => results)
				.then(res => res.map(({name, url}) => [name, url.split('/')[6]]))
				.then(handlePkmList)
				.catch(emptyPkmList);
		} else {
			console.log('here');
			getAllInfoOfPokemon(pokemon)
				.then(({name, id}) => {
					handlePokemonToShow({target: {value: name}});
					return [[name, id]];
				})
				.then(handlePkmList);
		}
	}, [nbrOfPkm, pokemon]);

	return <form>
		{
			state.pkmList.map(([name, id]) =>
				<label key={id}>
					<input type={'radio'} onClick={handlePokemonToShow} name={'pkm'} style={{display: 'none'}}
						value={name}/>
					<PkmMemberList pkm={name} pkmIndex={id}/>
				</label>)}
	</form>;
};

ListPkm.propTypes = {
	nbrOfPkm: PropTypes.number.isRequired,
	pokemon: PropTypes.string,
	handlePokemonToShow: PropTypes.func.isRequired,
};
