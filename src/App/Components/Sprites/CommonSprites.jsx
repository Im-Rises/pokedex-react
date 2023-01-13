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

	return <ShowAllSpriteOfObject ObjectOfUrl={state}/>;
};

CommonSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default CommonSprites;
