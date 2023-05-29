import {always, andThen, applySpec, identity, ifElse, pipeWith, prop} from 'ramda';
import {getArtwork, getIcon, getPokemon} from '../request/pokemon-request';
import {getPokemonFlavourEntryWithVersion, getPokemonTypes} from './pokemon-request';
import {getPokemonNumber} from './pokedex-request';
 
const isUndefined = value => value === undefined;

const asyncPipe = (asyncFunc, resultName) => requestResult =>
	pipeWith(andThen)([
		asyncFunc,
		ifElse(isUndefined, identity, applySpec({[resultName]: identity})),
		result => ({...result, ...requestResult}),
	])(requestResult);

const getAllFromPokemon = async pokemon =>
	pipeWith(andThen)([
		getPokemon,
		asyncPipe(getPokemonFlavourEntryWithVersion, 'flavourEntries'),
		applySpec({
			pokemonName: always(pokemon),
			officialArtwork: getArtwork,
			type: getPokemonTypes,
			icon: getIcon,
			pokemonNumber: getPokemonNumber,
			flavourEntries: prop('flavourEntries'),
		}),
	])(pokemon);

export default getAllFromPokemon;
