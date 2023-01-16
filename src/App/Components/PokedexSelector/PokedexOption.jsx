import PropTypes from 'prop-types';
import React from 'react';

const PokedexOption = ({name}) => <option value={name}>{name}</option>;

PokedexOption.propTypes = {
	name: PropTypes.string.isRequired,
};

export default PokedexOption;
