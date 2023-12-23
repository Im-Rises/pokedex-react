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
		<div className={'pokemon-details-page'}>
			<div className={'pokemon-details-panel'}>

				<div className={'pokemon-name-logo'}>
					<img src={props.pokemonData.icon} alt={props.pokemonData.pokemonName}/>
					<h1>{props.pokemonData.pokemonName} #{props.pokemonData.pokemonNumber}</h1>
				</div>

				<div className={'pokemon-data-holder'}>
					<div className={'pokemon-artwork-holder'}>
						<div className={'pokemon-artwork'}>
							<img src={props.pokemonData.officialArtwork} alt={props.pokemonData.pokemonName}/>
						</div>
					</div>
					<div className={'pokemon-infos-holder'}>
						<div className={'pokemon-infos'}>
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
							<div className={'pokemon-size-types'}>
								<ul>
									{R.map(
										type => <li key={type}>
											<p><img
												src={pokemonTypeConstant[type]}
												alt={type}
											/>{type}</p>
										</li>,
										props.pokemonData.type,
									)}
								</ul>
								<div>
									<p>Height: {props.pokemonOtherInfo.height} </p>
									<p>Weight: {props.pokemonOtherInfo.weight} </p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={'pokedex-details-controls'}>
					<button className={'button-previsous-pokemon-details'}
						onClick={() => props.changePokemon(-1)}>Previous
					</button>
					<button className={'button-exit-details-page'} onClick={props.exitDetailsPage}>Exit</button>
					<button onClick={() => {
						navigator.clipboard.writeText(`${window.location.href}?pokemon=${props.pokemonData.pokemonName}`)
							.then(() => alert('link copied to clipboard!'));
					}}>Share</button>
					<button className={'button-next-pokemon-details'} onClick={() => props.changePokemon(1)}>Next
					</button>
				</div>

			</div>
		</div>
	);
};

PokemonDetailsDumb.propTypes = {
	pokemonData: PropTypes.object.isRequired,
	pokemonOtherInfo: PropTypes.object.isRequired,
	exitDetailsPage: PropTypes.func.isRequired,
	changePokemon: PropTypes.func.isRequired,
};

