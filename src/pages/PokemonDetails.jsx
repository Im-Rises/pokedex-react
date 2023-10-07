import React, {useEffect, useState} from 'react';
import './PokemonDetails.scss';
import {getAllFromPokemon, getPokemonOtherInfo} from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';
import PropTypes from 'prop-types';
import {PokemonDetailsDumb} from '../components/PokemonDetailsDumb/PokemonDetailsDumb.jsx';

export const PokemonDetails = props => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	const [pokemonOtherInfo, setPokemonOtherInfo] = useState({});

	useEffect(() => {
		getAllFromPokemon(props.name)
			.then(setPokemonData);
		getPokemonOtherInfo(props.name)
			.then(setPokemonOtherInfo);
	}, [props.name]);

	return (
		<PokemonDetailsDumb pokemonData={pokemonData}
			pokemonOtherInfo={pokemonOtherInfo}
			name={props.name}
			exitDetailsPage={props.exitDetailsPage}
		/>
	);
};

PokemonDetails.propTypes = {
	name: PropTypes.string.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
};

