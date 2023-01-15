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

	return <div>
		<h1>Home Sprites</h1>
		<ShowAllSpriteOfObject ObjectOfUrl={state} />
	</div>;
};

HomeSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default HomeSprites;
