import React from 'react';
import {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';

const ThreeDimSprites = props => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		getSprites(props.pokemon)
			.then(obj => obj.filter(value => typeof value === 'string'))
			.then(setSprites);
	});

	return (
		<div>
			{sprites.map(link => <img src={link} alt={'image of a pokemon'} key={Math.random()}/>)}
		</div>);
};

ThreeDimSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default ThreeDimSprites;
