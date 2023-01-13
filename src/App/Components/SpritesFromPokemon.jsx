import React from 'react';
import {useEffect, useState} from 'react';
import {getSprites} from '../Requests';

export const SpritesFromPokemon = props => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		getSprites(props.pokemon).then(setSprites);
	});

	return (
		<div>
			{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
		</div>);
};
