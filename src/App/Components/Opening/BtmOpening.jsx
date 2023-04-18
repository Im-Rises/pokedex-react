import {changeClassName} from './manage-css';
import React from 'react';
import PropTypes from 'prop-types';

export const BtmOpening = ({hasOpened}) => (
	<div className={changeClassName(hasOpened, 'bottom')}>

	</div>
);

BtmOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
