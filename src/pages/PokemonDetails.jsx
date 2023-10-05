import React, {useEffect, useState} from 'react';
import './PokemonDetails.scss';
import {getAllFromPokemon, getPokemonOtherInfo} from '../requests/index.js';
import {pokemonDataModel} from '../constants/pokemon-data-fetch.js';
import pokemonTypeConstant from '../constants/pokemon-type-constant.js';
import PropTypes from 'prop-types';
import * as R from 'ramda';

export const PokemonDetails = props => {
	const [pokemonData, setPokemonData] = useState(pokemonDataModel);
	const [gameVersion, setGameVersion] = useState(0);
	const [pokemonOtherInfo, setPokemonOtherInfo] = useState({});

	useEffect(() => {
		getAllFromPokemon(props.name)
			.then(setPokemonData);
		setGameVersion(0b0);
		getPokemonOtherInfo(props.name)
			.then(setPokemonOtherInfo);
	}, [props.name]);

	return (
		<div className={'pokemon-details-panel'}>
			<div className={'exit-details-page'}>
				<button onClick={props.exitDetailsPage}>X</button>
			</div>
			<div className={'pokemon-presentation'}>
				<div className={'panel-name-artwork'}>
					<div className={'pokemon-name-logo'}>
						<img src={pokemonData.icon} alt={props.name}/>
						<h2>{props.name}</h2>
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
							type => <li key={type}>
								<p>{type}</p>
								<img
									style={{width: 'auto', height: '60%'}}
									src={pokemonTypeConstant[type]}
									alt={type}
								/>
							</li>,
							pokemonData.type,
						)}
					</ul>
					<p className={'pokemon-height-title'}>Height: {pokemonOtherInfo.height} </p>
					<p className={'pokemon-weight-title'}>Weight: {pokemonOtherInfo.weight} </p>
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
		</div>
	);
};

PokemonDetails.propTypes = {
	name: PropTypes.string.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
};

