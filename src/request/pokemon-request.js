const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		.then(jsonify);

const getArtwork = setter => requestResult => {
	setter(requestResult?.sprites?.front_default);
	return requestResult;
};

export {getPokemon, getArtwork};
