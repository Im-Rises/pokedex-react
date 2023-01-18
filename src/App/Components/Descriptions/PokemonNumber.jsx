import React from 'react';
import PropTypes from 'prop-types';

const PokemonNumber = ({obj, title}) => (
	<details>
		<summary>{title}</summary>
		<div style={{display: 'inline-flex'}}>
			{obj}
		</div>
	</details>
);

PokemonNumber.propTypes = {
	obj: PropTypes.string.isRequired,
	title: PropTypes.string,
};

export default PokemonNumber;
