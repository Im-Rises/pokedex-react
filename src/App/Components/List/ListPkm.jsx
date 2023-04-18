import React from 'react';
import PropTypes from 'prop-types';
import {PkmMemberList} from './PkmMemberList';

export const ListPkm = ({listOfPkm, handlePokemonToShow}) => <form>
	{
		listOfPkm.map(([name, id]) =>
			<label key={id}>
				<input type={'radio'} onClick={handlePokemonToShow} name={'pkm'} style={{display: 'none'}}
					value={name}/>
				<PkmMemberList pkm={name} pkmIndex={id + 1}/>
			</label>)}
</form>;

ListPkm.propTypes = {
	listOfPkm: PropTypes.array.isRequired,
	handlePokemonToShow: PropTypes.func.isRequired,
};
