import React from 'react';
import PropTypes from 'prop-types';

const PokemonName = ({obj, title}) => {
	console.log('PokemonName: ', obj);
	return (
		<div>
			<h1>{title}</h1>
			{/* <h2>{obj}</h2> */}
		</div>
	);
};

PokemonName.propTypes = {
	obj: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default PokemonName;
