import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import {TopOpening} from './TopOpening';
import {BtmOpening} from './BtmOpening';
import {GithubBar} from './GithubBar';

const PokeOpening = ({hasClicked, handleHasOpened}) => <div className={'opening'}>
	<TopOpening hasOpened={hasClicked}/>
	<input className={'opening-btn'} style={{display: hasClicked ? 'none' : 'block'}} type={'button'}
		value={'click\nto\nopen'} onClick={() => {
			console.log('click');
			handleHasOpened();
		}}/>
	<GithubBar hasClicked={hasClicked}/>
	<BtmOpening hasOpened={hasClicked}/>
</div>;

PokeOpening.propTypes = {
	hasClicked: PropTypes.bool.isRequired,
	handleHasOpened: PropTypes.func.isRequired,
};

export default PokeOpening;
