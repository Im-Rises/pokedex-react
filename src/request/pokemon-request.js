const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		.then(jsonify);

const getListOfPkmAvailable = nbr => fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nbr}`)
	.then(jsonify);

const getArtwork = setter => requestResult => {
	setter(requestResult?.sprites?.front_default);
	return requestResult;
};

const getIcon = setter => requestResult => {
	setter(requestResult?.sprites?.versions['generation-viii']?.icons?.front_default);
	return requestResult;
};

export {getPokemon, getArtwork, getIcon, getListOfPkmAvailable};
