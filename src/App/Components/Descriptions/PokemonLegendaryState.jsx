import React from 'react';
import PropTypes from 'prop-types';

const PokemonLegendaryState = ({obj, title}) => (
	<details>
		<summary>{title}</summary>
		<div style={{display: 'inline-flex'}}>
			{
				obj ? 'Legendary' : 'Not Legendary'
			}
		</div>
	</details>
);

PokemonLegendaryState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

PokemonLegendaryState.propTypes = {
	obj: PropTypes.bool.isRequired,
	title: PropTypes.string,
};

export default PokemonLegendaryState;
