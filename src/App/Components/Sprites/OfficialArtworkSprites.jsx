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

	return <details>
		<summary>Official Artwork Sprites</summary>
		<ShowAllSpriteOfObject ObjectOfUrl={state}/>
	</details>;
};

DreamWorldSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default DreamWorldSprites;
