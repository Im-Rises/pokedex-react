import PropTypes from 'prop-types';
import React from 'react';
import './list.css';

export const PkmMemberList = ({pkmIndex, pkm}) => <div className={'pkm-number-list'}>
	<img width={40} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pkmIndex}.png`} alt={''}/>
	{pkmIndex}
	<div className={'text-list'}>{pkm}</div>
</div>;

PkmMemberList.propTypes = {
	pkmIndex: PropTypes.number.isRequired,
	pkm: PropTypes.string.isRequired,
};

