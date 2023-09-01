import {GitHubLink} from './GitHubLink.jsx';
import './GitHubBar.scss';
import React from 'react';
import PropTypes from 'prop-types';

export const GitHubBar = props => {
	const changeClassName = (hasClicked, where) => hasClicked ? `${where}-move` : `${where}-fixed`;

	return (
		<div className={changeClassName(props.isClicked, 'opening-github')}>
			<div className={'gitbar-left'}>
				<GitHubLink text={'Clément Reiffers'} link={'https://github.com/clementreiffers'}/>
			</div>
			<div className={'gitbar-right'}>
				<GitHubLink text={'Quentin Morel'} link={'https://github.com/Im-Rises'}/>
			</div>
		</div>
	);
};

GitHubBar.propTypes = {
	isClicked: PropTypes.bool.isRequired,
};
