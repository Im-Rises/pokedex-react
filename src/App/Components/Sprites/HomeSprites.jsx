import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const HomeSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({other}) => other.home)
			.then(setState);
	}, [pokemon]);

	return <ShowAllSpriteOfObject ObjectOfUrl={state} />;
};

HomeSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default HomeSprites;
