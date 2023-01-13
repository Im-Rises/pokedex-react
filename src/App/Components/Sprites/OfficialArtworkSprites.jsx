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

	return <ShowAllSpriteOfObject ObjectOfUrl={state}/>;
};

DreamWorldSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default DreamWorldSprites;
