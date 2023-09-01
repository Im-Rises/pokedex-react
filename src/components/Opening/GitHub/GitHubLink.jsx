import GitHubIcon from '/src/images/github/github.svg';
import React from 'react';
import PropTypes from 'prop-types';
import './GithubLink.scss';

export const GitHubLink = props => (
	<div className={'github-repo'}>
		<a className={'github-links'} target={'_blank'} href={props.link} rel='noreferrer'>{props.text}
			<img className={'github-icon'} src={GitHubIcon} alt={'github'}/>
		</a>
	</div>
);

GitHubLink.propTypes = {
	text: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};
