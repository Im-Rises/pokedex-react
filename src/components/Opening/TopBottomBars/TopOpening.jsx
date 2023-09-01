import React from 'react';
import PropTypes from 'prop-types';
import PokemonLogo from '/src/images/logo/logo-pokedex.png';
// import './GithubLink.scss';
import {GitHubLink} from '../GitHub/GitHubLink.jsx';

export const TopOpening = ({hasOpened}) => {
	const changeClassName = (hasClicked, where) => hasClicked ? `${where}-move` : `${where}-fixed`;
	return (

		<div className={changeClassName(hasOpened, 'top')}>
			<img className={'pokedex-logo'}
				src={PokemonLogo} alt={'pokedex'}/>
			<GitHubLink text={'pokedex-react'} link={'https://github.com/Im-Rises/pokedex-react'}/>
		</div>
	);
};

TopOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
