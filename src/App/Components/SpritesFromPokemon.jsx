import {useEffect, useState} from 'react';
import {getSprites} from '../Requests';

export const SpritesFromPokemon = props => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		getSprites(props.pokemon).then(setSprites);
	});

	// eslint-disable-next-line react/react-in-jsx-scope
	return (<div>
		{/* eslint-disable-next-line react/react-in-jsx-scope */}
		{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
	</div>);
};
