import GitHubIcon from '@mui/icons-material/GitHub';
import {changeClassName} from './manage-css';
import React from 'react';
import PropTypes from 'prop-types';

export const TopOpening = ({hasOpened}) => (
	<div className={changeClassName(hasOpened, 'top')}>
		<img className={'pokedex-logo'}
			src={'https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png'} alt={'pokedex'}/>
		<div className={'github-repo'}>
			<a className={'github-links'} href={'https://github.com/Im-Rises/pokedex-react'}>pokedex-react <GitHubIcon
				className={'github-icon'}/></a>
		</div>
	</div>
);

TopOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
