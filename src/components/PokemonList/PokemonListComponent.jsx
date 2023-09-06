import React from 'react';
import PropTypes from 'prop-types';
import {PokemonListElement} from './PokemonListElement.jsx';

export const PokemonListComponent = props => <>{
	props.stringList.map(
		(element, key) =>
			<div key={key} className={'pokemon-elem'} onClick={() => props.handleStringSelected(element)}>
				<PokemonListElement pokemonName={element}/>
			</div>,
	)
}</>;

PokemonListComponent.propTypes = {
	stringList: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleStringSelected: PropTypes.func,
};
