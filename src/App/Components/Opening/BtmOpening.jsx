import GitHubIcon from '@mui/icons-material/GitHub';
import {changeClassName} from './manage-css';
import React from 'react';
import PropTypes from 'prop-types';

export const BtmOpening = ({hasOpened}) => (
	<div className={changeClassName(hasOpened, 'bottom')}>
		<div className={'opening-github'}>
			<div className={'left'}>
				<a className={'github-links'} href={'https://github.com/clementreiffers'}>clementreiffers <GitHubIcon
					className={'github-icon'}/></a>
			</div>
			<div className={'right'}>
				<a className={'github-links'} href={'https://github.com/Im-Rises'}>Im-Rises<GitHubIcon
					className={'github-icon'}/></a>
			</div>
		</div>
	</div>
);

BtmOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
