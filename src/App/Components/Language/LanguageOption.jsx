import PropTypes from 'prop-types';
import React from 'react';

const LanguageOption = ({name}) => <option value={name}>{name}</option>;

LanguageOption.propTypes = {
	name: PropTypes.string.isRequired,
};

export default LanguageOption;
