import React from 'react';
import PropTypes from 'prop-types';

const PokemonDescription = ({obj, title}) => {
	console.log(obj);

	return (
		<div>
			<details>
				<summary>{title}</summary>
				<div style={{display: 'inline-flex'}}>
					{
						obj
					}
				</div>
			</details>
		</div>);
};

PokemonDescription.propTypes = {
	obj: PropTypes.string.isRequired,
	title: PropTypes.string,
};

export default PokemonDescription;
