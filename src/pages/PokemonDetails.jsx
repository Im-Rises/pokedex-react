import React, {useEffect, useState} from 'react';
import './PokemonDetails.scss';
import {getAllFromPokemon, getPokemonOtherInfo} from '../requests/index.js';
import {
	pokemonDataModel,
	pokemonDataOtherInfoModel,
} from '../constants/pokemon-data-fetch.js';
import PropTypes from 'prop-types';
import {PokemonDetailsDumb} from '../components/PokemonDetailsDumb/PokemonDetailsDumb.jsx';

export const PokemonDetails = props => {
	const [pokemonName, setPokemonName] = useState(props.name);
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	const [pokemonOtherInfo, setPokemonOtherInfo] = useState(pokemonDataOtherInfoModel);

	useEffect(() => {
		getAllFromPokemon(pokemonName)
			.then(setPokemonData);

		getPokemonOtherInfo(pokemonName)
			.then(setPokemonOtherInfo);

		const newUrl = `${window.location.origin}${window.location.pathname}?pokemon=${pokemonName}`;
		history.pushState(null, null, newUrl);
	}, [pokemonName]);

	const changePokemon = number => {
		const currentIndex = props.pokemonList.indexOf(pokemonName);

		if (currentIndex + number > props.pokemonList.length - 1) {
			setPokemonName(props.pokemonList[0]);
		} else if (currentIndex + number < 0) {
			setPokemonName(props.pokemonList[props.pokemonList.length - 1]);
		} else {
			setPokemonName(props.pokemonList[currentIndex + number]);
		}
	};

	return (
		<PokemonDetailsDumb
			pokemonData={pokemonData}
			pokemonOtherInfo={pokemonOtherInfo}
			exitDetailsPage={props.exitDetailsPage}
			changePokemon={changePokemon}
		/>
	);
};

PokemonDetails.propTypes = {
	name: PropTypes.string.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
	isEasterEgg: PropTypes.bool,
	pokemonList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

