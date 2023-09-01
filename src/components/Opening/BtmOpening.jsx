import React from 'react';
import PropTypes from 'prop-types';

export const BtmOpening = ({hasOpened}) => {
	const changeClassName = (hasClicked, where) => hasClicked ? `${where}-move` : `${where}-fixed`;

	return (
		<div className={changeClassName(hasOpened, 'bottom')}>

		</div>
	);
};

BtmOpening.propTypes = {
	hasOpened: PropTypes.bool.isRequired,
};
