import React, {useEffect, useState} from 'react';
import './PokemonDetails.scss';
import {getAllFromPokemon, uppercaseFirstLetter} from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';
import pokemonTypeConstant from '../constants/pokemon-type-constant.js';
import PropTypes from 'prop-types';
import * as R from 'ramda';

export const PokemonDetails = props => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	const [gameVersion, setGameVersion] = useState('');
	// const [gameVersionRealName, setGameVersionRealName] = useState('');

	useEffect(() => {
		getAllFromPokemon(props.name)
			.then(setPokemonData);
		setGameVersion(0b0);
	}, [props.name]);

	return (
		<>
			{/* <h1 className={'pokemon-info-title'}>Pokémon Info</h1> */}
			<div className={'main-pokemon-panel'}>
				<div className={'panel-name-artwork'}>
					<div className={'pokemon-name-logo'}>
						<img src={pokemonData.icon} alt={props.name}/>
						<h2>{uppercaseFirstLetter(props.name)}</h2>
					</div>
					<div className={'pokemon-artwork'}>
						<img src={pokemonData.officialArtwork} alt={props.name}/>
					</div>
				</div>
				<div className={'pokemon-details'}>
					<span className={'placeholder'}>
						<h2>Placeholder</h2>
					</span>
					<p className={'pokemon-number'}>N°{pokemonData.pokemonNumber}</p>
					<p className={'pokemon-types-title'}>Types:</p>
					<ul>
						{R.map(
							type => <li key={type}>{type}
								<img
									style={{width: 'auto', height: '60%'}}
									src={pokemonTypeConstant[type]}
									alt={type}
								/>
							</li>,
							pokemonData.type,
						)}
					</ul>
				</div>
			</div>
			<div className={'pokemon-description'}>
				<h2>Description</h2>
				<select name='description' id='description' onChange={event => setGameVersion(event.target.value)}>
					{pokemonData.flavourEntries && pokemonData.flavourEntries.gameVersion.map(
						(gameVersion, index) => <option key={index}
							value={index}>{gameVersion}</option>,
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

