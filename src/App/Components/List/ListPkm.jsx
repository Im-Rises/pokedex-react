import React, {useEffect, useState} from 'react';
import {makeRequest} from '../../Requests';
import {PkmMemberList} from './PkmMemberList';
import PropTypes from 'prop-types';

export const ListPkm = ({nbrOfPkm, handlePokemonToShow}) => {
	const [state, setState] = useState({pkmList: []});

	const handlePkmList = pkmList => setState({...state, pkmList});

	useEffect(() => {
		makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${nbrOfPkm}`)
			.then((({results}) => results))
			.then(res => res.map(v => v.name))
			.then(handlePkmList);
	}, [nbrOfPkm]);

	return <form>
		{
			state.pkmList.map((pkm, i) =>
				<label key={i + 1}>
					<input type={'radio'} onClick={handlePokemonToShow} name={'pkm'} style={{display: 'none'}} value={pkm}/>
					<PkmMemberList pkm={pkm} pkmIndex={i + 1}/>
				</label>,
			)}
	</form>;
};

ListPkm.propTypes = {
	nbrOfPkm: PropTypes.number,
	handlePokemonToShow: PropTypes.func.isRequired,
};
