import React, {useEffect, useState} from 'react';
import {getAllStringsValuesFromObject, getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Sprite from './Sprite';

const CommonSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		if (pokemon !== '') {
			getSprites(pokemon)
				.then(R.juxt([getAllStringsValuesFromObject, R.keys]))
				.then(([url, name]) => R.zip(url, name))
				.then(setState);
		}
	}, [pokemon]);

	return (
		<ul>
			{state.map(
				([url, name]) => <Sprite key={Math.random()} name={name} url={url}/>)
			}
		</ul>);
};

CommonSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default CommonSprites;
