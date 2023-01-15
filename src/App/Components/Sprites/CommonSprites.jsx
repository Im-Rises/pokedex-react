import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const CommonSprites = ({pokemon}) => {
	const [sprites, setSprites] = useState(Object);

	useEffect(() => {
		getSprites(pokemon)
			.then(setSprites);
	}, [pokemon]);

	return <ShowAllSpriteOfObject ObjectOfUrl={sprites} title={'common sprites'}/>;
};

CommonSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default CommonSprites;
