import React from 'react';
import {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';

const CommonSprites = ({pokemon}) => {
	const [sprites, setSprites] = useState([]);

	useEffect(() => {
		if (pokemon !== '') {
			console.log(pokemon);
			getSprites(pokemon)
				.then(resp => Object.values(resp))
				.then(obj => obj.filter(value => typeof value === 'string'))
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
