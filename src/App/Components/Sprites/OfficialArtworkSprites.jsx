import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const DreamWorldSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({other}) => other['official-artwork'])
			.then(setState);
	}, [pokemon]);

	return <div>
		<h1>Official Artwork Sprites</h1>
		<ShowAllSpriteOfObject ObjectOfUrl={state}/>
	</div>;
};

DreamWorldSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default DreamWorldSprites;
