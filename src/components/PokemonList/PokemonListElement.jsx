import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import {getAllFromPokemon, uppercaseFirstLetter} from '../../requests/index.js';
import React from 'react';
import {clementPokemonData, quentinPokemonData} from '../../constants/pokemon-data-fetch.js';

const LazyLoadImage = props => {
	const imageRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Charger l'image lorsque l'élément devient visible
					imageRef.current.src = props.src;
					observer.unobserve(imageRef.current);
				}
			});
		});

		observer.observe(imageRef.current);

		return () => {
			observer.disconnect();
		};
	}, [props.src]);

	return <img ref={imageRef} alt=''/>;
};

export const PokemonListElement = props => {
	const [icon, setIcon] = useState('');

	useEffect(() => {
		// Don't mind this code, it's juste a joke 😝
		if (props.pokemonName === clementPokemonData.pokemonName) {
			setIcon(clementPokemonData.icon);
			return;
		}

		// Leave this code, it's the perfection 😁
		if (props.pokemonName === quentinPokemonData.pokemonName) {
			setIcon(quentinPokemonData.icon);
			return;
		}

		getAllFromPokemon(props.pokemonName)
			.then(({icon}) => setIcon(icon));
	}, [props.pokemonName]);

	return <div>
		{icon && <LazyLoadImage src={icon}/>}
		{uppercaseFirstLetter(props.pokemonName)}
	</div>;
};

PokemonListElement.propTypes = {
	pokemonName: PropTypes.string.isRequired,
};
LazyLoadImage.propTypes = {
	src: PropTypes.string.isRequired,
};
