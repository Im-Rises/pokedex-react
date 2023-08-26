import React, {useEffect, useMemo, useState} from 'react';
import {getAllFromPokemon, uppercaseFirstLetter} from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';
import PropTypes from 'prop-types';
import * as R from 'ramda';

export const PokemonDetails = props => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	const [gameVersion, setGameVersion] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.name)
			.then(setPokemonData);
	}, [props.name]);

	return (
		<>
			<div>
				<h1>Pokémon Info</h1>
			</div>
			<div>
				<h2>{uppercaseFirstLetter(props.name)}</h2>
			</div>
			<div>
				<img src={pokemonData.icon} alt={props.name}/>
				<img src={pokemonData.officialArtwork} alt={props.name}/>
			</div>
			<div>
				<p>N°{pokemonData.pokemonNumber}</p>
				<ul>
					{R.map(
						type => <li key={type}>{type}</li>,
						pokemonData.type,
					)}
				</ul>
			</div>
			<div>
				<h3>Description</h3>
				<select name='description' id='description' onChange={event => setGameVersion(event.target.value)}>
					{pokemonData.flavourEntries && pokemonData.flavourEntries.gameVersion.map(
						(gameVersion, index) => <option key={index} value={index}>{gameVersion}</option>,
					)}
				</select>
				<p>{pokemonData.flavourEntries && pokemonData.flavourEntries.flavorText[gameVersion]}</p>
			</div>
		</>
	);
};

PokemonDetails.propTypes = {
	name: PropTypes.string.isRequired,
};
