const jsonify = data => data.json();

const getPokemon = pokemonName =>
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		.then(jsonify);

const getListOfPkmAvailable = nbr => fetch(`https://pokeapi.co/api/v2/pokemon?limit=${nbr}`)
	.then(jsonify);

const getArtwork = requestResult => requestResult?.sprites?.front_default;

const getIcon = requestResult => requestResult?.sprites?.versions['generation-viii']?.icons?.front_default;

export {getPokemon, getArtwork, getIcon, getListOfPkmAvailable};
