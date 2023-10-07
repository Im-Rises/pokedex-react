/* Easter egg data */

const clementPokemonData = {
	pokemonName: 'clement',
	officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/569.png',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png',
	type: ['normal'],
	flavorEntries: {
		gameVersion: ['black'],
		flavorText: ['This Pokémon eats trash, which turns into poison inside its body. The main component of the poison depends on what sort of trash was eaten.'],
	},
	pokemonNumber: 569,
};

const clementPokemonDataOtherInfo = {
	height: '0.6 m',
	weight: '31.0 kg',
};

const quentinPokemonData = {
	pokemonName: 'quentin',
	officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10157.png',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10157.png',
	type: ['psychic', 'dragon'],
	flavorEntries: {
		gameVersion: ['ultra-sun'],
		flavorText: ['This is its form when it has absorbed overwhelming light energy. It fires laser beams from all over its body.'],
	},
	pokemonNumber: 10157,
};

const quentinPokemonDataOtherInfo = {
	height: '4.0 m',
	weight: '999.9 kg',
};

/* Array of data for easter egg */

const easterEggPokemonData = [clementPokemonData, quentinPokemonData];

const easterEggPokemonDataOtherInfo = [clementPokemonDataOtherInfo, quentinPokemonDataOtherInfo];

export {easterEggPokemonData, easterEggPokemonDataOtherInfo};
