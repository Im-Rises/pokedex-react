import React from 'react';
import {useEffect, useState} from 'react';
import {convertObjectToList, getAllStringsFromList, getSprites} from '../../Requests';
import PropTypes from 'prop-types';

const HomeSprites = ({pokemon}) => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({other}) => other.home)
			.then(convertObjectToList)
			.then(getAllStringsFromList)
			.then(setSprites);
	}, [pokemon]);

	return (
		<div>
			{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
		</div>);
};

HomeSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default HomeSprites;
