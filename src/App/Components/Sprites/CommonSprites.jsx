import React from 'react';
import {useEffect, useState} from 'react';
import {convertObjectToList, getAllStringsFromList, getSprites} from '../../Requests';
import PropTypes from 'prop-types';

const CommonSprites = ({pokemon}) => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		if (pokemon !== '') {
			getSprites(pokemon)
				.then(convertObjectToList)
				.then(getAllStringsFromList)
				.then(setSprites);
		}
	}, [pokemon]);

	return (
		<div>
			{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
		</div>);
};

CommonSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default CommonSprites;
