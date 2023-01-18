import React from 'react';
import PropTypes from 'prop-types';

const PokemonName = ({obj, title}) =>
	(
		<details>
			<summary>{title}</summary>
			<div style={{display: 'inline-flex'}}>
				{obj}
			</div>
		</details>
	);

PokemonName.propTypes = {
	obj: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default PokemonName;
