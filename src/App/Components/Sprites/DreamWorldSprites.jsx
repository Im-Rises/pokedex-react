import React from 'react';
import {useEffect, useState} from 'react';
import {convertObjectToList, getAllStringsFromList, getSprites} from '../../Requests';
import PropTypes from 'prop-types';

const DreamWorldSprites = ({pokemon}) => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({other}) => other.dream_world)
			.then(convertObjectToList)
			.then(getAllStringsFromList)
			.then(setSprites);
	});

	return (
		<div>
			{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
		</div>);
};

DreamWorldSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default DreamWorldSprites;
