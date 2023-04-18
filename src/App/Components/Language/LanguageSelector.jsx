import React from 'react';
import {getLanguageIdentifiers} from '../../Requests/index';
import PropTypes from 'prop-types';
import LanguageOption from './LanguageOption';

const LanguageSelector = props => {
	const [languages, setLanguages] = React.useState([]);
	React.useEffect(() => {
		getLanguageIdentifiers().then(setLanguages);
	});

	return (
		<select onChange={props.setLanguage}>
			{languages.map(({name}, i) => <LanguageOption name={name} key={i}/>)}
		</select>
	);
};

LanguageSelector.propTypes = {
	initLanguage: PropTypes.string.isRequired,
	setLanguage: PropTypes.func.isRequired,
};

export default LanguageSelector;

