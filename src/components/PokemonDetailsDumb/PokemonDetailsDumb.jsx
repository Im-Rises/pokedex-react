import * as R from 'ramda';
import pokemonTypeConstant from '../../constants/pokemon-type-constant.js';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './PokemonDetailsDumb.scss';

export const PokemonDetailsDumb = props => {
	const [pokemonDescription, setPokemonDescription] = useState('');
	const [pokemonVersion, setPokemonVersion] = useState(0);

	useEffect(() => {
		setPokemonDescription(props.pokemonData.flavorEntries.flavorText[pokemonVersion]);
	});

	return (
		<div className={'pokemon-details-panel'}>
			<div className={'exit-details-page'}>
				<button onClick={props.exitDetailsPage}>X</button>
			</div>
			<div className={'pokemon-presentation'}>
				<div className={'panel-name-artwork'}>
					<div className={'pokemon-name-logo'}>
						<img src={props.pokemonData.icon} alt={props.pokemonData.pokemonName}/>
						<h2>{props.pokemonData.pokemonName} #{props.pokemonData.pokemonNumber}</h2>
					</div>
					<div className={'pokemon-artwork-holder'}>
						<div className={'pokemon-artwork'}>
							<img src={props.pokemonData.officialArtwork} alt={props.pokemonData.pokemonName}/>
						</div>
					</div>
				</div>
				<div className={'pokemon-details'}>
					<span className={'placeholder'}>
						<h2>Placeholder</h2>
					</span>
					<div className={'pokemon-details-infos'}>
						{/* <p className={'pokemon-number'}>N°{props.pokemonData.pokemonNumber}</p> */}
						{/* <p className={'pokemon-types-title'}>Types:</p> */}
						<ul>
							{R.map(
								type => <li key={type}>
									{/* <p>{type}</p> */}
									<img
										src={pokemonTypeConstant[type]}
										alt={type}
									/>
								</li>,
								props.pokemonData.type,
							)}
						</ul>
						<div className={'pokemon-height-weight'}>
							<p>Height: {props.pokemonOtherInfo.height} </p>
							<p>Weight: {props.pokemonOtherInfo.weight} </p>
						</div>
						<div className={'pokemon-description'}>
							<h2>Description</h2>
							<select name='description' id='description'
								// onChange={event => setPokemonDescription(props.pokemonData.flavorEntries.flavorText[event.target.value])}>
								onChange={event => setPokemonVersion(event.target.value)}>
								{props.pokemonData.flavorEntries && props.pokemonData.flavorEntries.gameVersion.map(
									(gameVersion, index) => <option key={gameVersion}
										value={index}>{gameVersion}</option>,
								)}
							</select>
							<p>{pokemonDescription}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

PokemonDetailsDumb.propTypes = {
	pokemonData: PropTypes.object.isRequired,
	pokemonOtherInfo: PropTypes.object.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
};
