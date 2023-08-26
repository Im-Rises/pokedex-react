import React from 'react';

export const PokemonDetails = () => {
	const name = 'Pikachu';
	const types = ['Electric'];
	const description = 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.';
	const imageLink = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png';
	const number = '025';
	return (
		<>
			<div>
				<h1>Pokémon Info</h1>
			</div>
			<div>
				<img src={imageLink} alt={name}/>
			</div>
			<div>
				<p>N°{number}</p>
				<h2>{name}</h2>
				<ul>
					{types.map((type, index) => (
						<li key={index}>{type}</li>
					))}
				</ul>
			</div>
			<div>
				<p>{description}</p>
			</div>
		</>
	);
};

