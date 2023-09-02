import React from 'react';
import './PokeOpening.scss';
import PropTypes from 'prop-types';
import {TopOpening} from './TopBottomBars/TopOpening';
import {BtmOpening} from './TopBottomBars/BtmOpening';
import {GitHubBar} from './GitHub/GitHubBar.jsx';

const PokeOpening = ({hasClicked, handleHasOpened}) => <div className={'opening'}>
	<TopOpening hasOpened={hasClicked}/>
	<GitHubBar isClicked={hasClicked}/>
	{
		!hasClicked && (
			<div className={'opening-btn'}>
				<div className={'opening-btn-center'} onClick={() => {
					handleHasOpened();
				}}></div>
			</div>
		)
	}
	<BtmOpening hasOpened={hasClicked}/>
</div>;

PokeOpening.propTypes = {
	hasClicked: PropTypes.bool.isRequired,
	handleHasOpened: PropTypes.func.isRequired,
};

export default PokeOpening;
