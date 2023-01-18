import React from 'react';
import PropTypes from 'prop-types';

const PokemonMythicalState = ({obj, title}) => (
	<details>
		<summary>{title}</summary>
		<div style={{display: 'inline-flex'}}>
			{
				obj ? 'Mythical' : 'Not Mythical'
			}
		</div>
	</details>
);

PokemonMythicalState.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

PokemonMythicalState.props = {
	obj: PropTypes.bool.isRequired,
	title: PropTypes.string,
};

export default PokemonMythicalState;
