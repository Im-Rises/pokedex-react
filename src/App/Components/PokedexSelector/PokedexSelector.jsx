import React from 'react';
import PropTypes from 'prop-types';
import PokedexOption from './PokedexOption';
import {getPokedexIdentifiers} from '../../Requests/index';

export const PokedexSelector = props => {
	const [pokedexes, setPokedexes] = React.useState([]);
	React.useEffect(() => {
		getPokedexIdentifiers().then(setPokedexes);
	});

	return (
		<select onChange={props.setPokedex}>
			{pokedexes.map(({name}, i) => <PokedexOption name={name} key={i}/>)}
		</select>
	);
};

PokedexSelector.propTypes = {
	initPokedex: PropTypes.string.isRequired,
	setPokedex: PropTypes.func.isRequired,
};
