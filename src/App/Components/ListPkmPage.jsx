import React, {useEffect, useState} from 'react';
import {makeRequest} from '../Requests';

export const ListPkmPage = () => {
	const [state, setState] = useState({maxPkm: Number, pkmList: []});

	const truc = 1;
	const handleMaxPkm = ({count}) => setState({...state, maxPkm: count});

	const handlePkmList = pkmList => setState({...state, pkmList});

	useEffect(() => {
		makeRequest('https://pokeapi.co/api/v2/pokemon')
			.then(handleMaxPkm);
		makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=${state.maxPkm}`)
			.then((({results}) => results))
			.then(res => res.map(v => v.name))
			.then(handlePkmList);
	}, [truc]);

	return <div>
		{state.pkmList.map((pkm, i) => <div key={i}>{i + 1} - {pkm}</div>)}
	</div>;
};
