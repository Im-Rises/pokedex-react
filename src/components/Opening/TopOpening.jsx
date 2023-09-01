import GitHubIcon from '/src/images/github/github.svg';
import React from 'react';
import PropTypes from 'prop-types';
import PokemonLogo from '/src/images/logo/logo-pokedex.png';
import './GithubLink.scss';

export const TopOpening = ({hasOpened}) => {
	const changeClassName = (hasClicked, where) => hasClicked ? `${where}-move` : `${where}-fixed`;
	return (

		<div className={changeClassName(hasOpened, 'top')}>
			<img className={'pokedex-logo'}
				src={PokemonLogo} alt={'pokedex'}/>
			<div className={'github-repo'}>
				<a className={'github-links'} href={'https://github.com/Im-Rises/pokedex-react'}>pokedex-react
					<img className={'github-icon'} src={GitHubIcon} alt={'github'}/>
				</a>
			</div>
		</div>
	);
};

TopOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
