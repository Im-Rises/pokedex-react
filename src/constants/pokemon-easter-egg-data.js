/* Easter egg data */

const clementPokemonData = {
	pokemonName: 'clement',
	officialArtwork: 'https://avatars.githubusercontent.com/u/44473020?v=4',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png',
	type: ['normal'],
	flavorEntries: {
		gameVersion: ['Job'],
		flavorText: ['Consultant Cloud DevOps'],
	},
	pokemonNumber: 569,
};

const clementPokemonDataOtherInfo = {
	// realName: 'Clément Reiffers',
	height: '0.6m',
	weight: '31.0kg',
};

const quentinPokemonData = {
	pokemonName: 'quentin',
	officialArtwork: 'https://avatars.githubusercontent.com/u/59691442?v=4',
	icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10157.png',
	type: ['psychic', 'dragon'],
	flavorEntries: {
		gameVersion: ['Job'],
		flavorText: ['Game Developer'],
	},
	pokemonNumber: 10157,
};

const quentinPokemonDataOtherInfo = {
	// realName: 'Quentin MOREL (Im-Rises)',
	height: '4.0m',
	weight: '999.9kg hands up',
};

/* Array of data for easter egg */

const easterEggPokemonData = [clementPokemonData, quentinPokemonData];

const easterEggPokemonDataOtherInfo = [clementPokemonDataOtherInfo, quentinPokemonDataOtherInfo];

export {easterEggPokemonData, easterEggPokemonDataOtherInfo};
