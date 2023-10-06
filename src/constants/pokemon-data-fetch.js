const pokemonDataModel = {
	pokemonName: '',
	officialArtwork: '',
	icon: '',
	type: '',
	flavourEntries: '',
	pokemonNumber: undefined,
};

const clementPokemonData = {
	pokemonName: 'clement',
	officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/569.png',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png',
	type: ['normal'],
	flavourEntries: 'This Pokémon eats trash, which turns into poison inside its body. The main component of the poison depends on what sort of trash was eaten.',
	pokemonNumber: 569,
};

const quentinPokemonData = {
	pokemonName: 'quentin',
	officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10157.png',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10157.png',
	type: ['psychic', 'dragon'],
	flavourEntries: 'This is its form when it has absorbed overwhelming light energy. It fires laser beams from all over its body.',
	pokemonNumber: 10157,
};

const easterEggPokemonData = [clementPokemonData, quentinPokemonData];

export {pokemonDataModel, easterEggPokemonData};
