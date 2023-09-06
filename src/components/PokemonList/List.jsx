import React from 'react';
import PropTypes from 'prop-types';

export const List = props => (
	<>{
		props.stringList.map(
			(element, key) =>
				<div key={key}
					className={'pokemon-elem'}
					onClick={() => props.handleStringSelected(element)}>
					{element}
				</div>,
		)
	}</>
);

List.propTypes = {
	stringList: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleStringSelected: PropTypes.func,
};
