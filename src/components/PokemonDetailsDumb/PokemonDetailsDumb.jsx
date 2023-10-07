import * as R from 'ramda';
import pokemonTypeConstant from '../../constants/pokemon-type-constant.js';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './PokemonDetailsDumb.scss';

export const PokemonDetailsDumb = props => {
	const [gameVersion, setGameVersion] = useState(0);
	console.log(props.pokemonData.flavourEntries);
	useEffect(
		() => {
			setGameVersion(0b0);
		},
	);

	return (
		<div className={'pokemon-details-panel'}>
			<div className={'exit-details-page'}>
				<button onClick={props.exitDetailsPage}>X</button>
			</div>
			<div className={'pokemon-presentation'}>
				<div className={'panel-name-artwork'}>
					<div className={'pokemon-name-logo'}>
						<img src={props.pokemonData.icon} alt={props.pokemonData.pokemonName}/>
						<h2>{props.pokemonData.pokemonName}</h2>
					</div>
					<div className={'pokemon-artwork'}>
						<img src={props.pokemonData.officialArtwork} alt={props.pokemonData.pokemonName}/>
					</div>
				</div>
				<div className={'pokemon-details'}>
					<span className={'placeholder'}>
						<h2>Placeholder</h2>
					</span>
					<p className={'pokemon-number'}>N°{props.pokemonData.pokemonNumber}</p>
					<p className={'pokemon-types-title'}>Types:</p>
					<ul>
						{R.map(
							type => <li key={type}>
								<p>{type}</p>
								<img
									src={pokemonTypeConstant[type]}
									alt={type}
								/>
							</li>,
							props.pokemonData.type,
						)}
					</ul>
					<p className={'pokemon-height-title'}>Height: {props.pokemonOtherInfo.height} </p>
					<p className={'pokemon-weight-title'}>Weight: {props.pokemonOtherInfo.weight} </p>
				</div>
			</div>
			<div className={'pokemon-description'}>
				<h2>Description</h2>
				<select name='description' id='description' onChange={event => setGameVersion(event.target.value)}>
					{props.pokemonData.flavourEntries && props.pokemonData.flavourEntries.gameVersion.map(
						(gameVersion, index) => <option key={gameVersion} value={index}>{gameVersion}</option>,
					)}
				</select>
				<p>{props.pokemonData.flavourEntries && props.pokemonData.flavourEntries.flavorText[gameVersion]}</p>
			</div>
		</div>
	);
};

PokemonDetailsDumb.propTypes = {
	pokemonData: PropTypes.object.isRequired,
	pokemonOtherInfo: PropTypes.object.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
	description: PropTypes.string,
};
