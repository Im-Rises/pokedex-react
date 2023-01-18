import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import PropTypes from 'prop-types';
import {changeClassName} from './manage-css';

export const GithubBar = ({hasClicked}) => (
	<div className={changeClassName(hasClicked, 'opening-github')}>
		<div className={'left'}>
			<a className={'github-links'} href={'https://github.com/clementreiffers'}>clementreiffers <GitHubIcon
				className={'github-icon'}/>{hasClicked}</a>
		</div>
		<div className={'right'}>
			<a className={'github-links'} href={'https://github.com/Im-Rises'}>Im-Rises<GitHubIcon
				className={'github-icon'}/></a>
		</div>
	</div>
);

GithubBar.propTypes = {
	hasClicked: PropTypes.bool.isRequired,
};
