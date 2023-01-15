import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const CommonSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		if (pokemon !== '') {
			getSprites(pokemon)
				.then(setState);
		}
	}, [pokemon]);

	return <div>
		<h1>Common Sprites</h1>
		<ShowAllSpriteOfObject ObjectOfUrl={state}/>
	</div>;
};

CommonSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default CommonSprites;
