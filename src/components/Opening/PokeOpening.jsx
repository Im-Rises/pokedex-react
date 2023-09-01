import React from 'react';
import './PokeOpening.scss';
import PropTypes from 'prop-types';
import {TopOpening} from './TopOpening';
import {BtmOpening} from './BtmOpening';

const PokeOpening = ({hasClicked, handleHasOpened}) => <div className={'opening'}>
	<TopOpening hasOpened={hasClicked}/>
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
