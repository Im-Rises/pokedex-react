const getPokemon = pokemonName =>
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

export {getPokemon};
