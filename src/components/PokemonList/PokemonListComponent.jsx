import React from 'react';
import PropTypes from 'prop-types';
import {PokemonListElement} from './PokemonListElement.jsx';
import './PokemonListComponent.scss';

export const PokemonListComponent = props => <>{
	props.stringList.map(
		(element, key) =>
			<div key={key} className={'pokemon-elem' + (props.selectedPokemonName === element ? ' selected' : '')}
				onClick={() => {
					props.handleStringSelected(element);
				}}>
				<PokemonListElement pokemonName={element}/>
			</div>,
	)
}</>;

PokemonListComponent.propTypes = {
	stringList: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleStringSelected: PropTypes.func,
	selectedPokemonName: PropTypes.string,
};
