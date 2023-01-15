import React from 'react';
import {getLanguageIdentifiers} from '../../Requests/index';
import PropTypes from 'prop-types';

const LanguageSelector = props => {
	const [languages, setLanguages] = React.useState([]);
	React.useEffect(() => {
		getLanguageIdentifiers().then(setLanguages);
	});

	return (
		<select onChange={e => {
			props.setLanguage(e.target.value);
		}}>
			{languages.map(language => (
				<option key={language.id} value={language.id}>
					{language.name}
				</option>
			))}
		</select>
	);
};

LanguageSelector.propTypes = {
	initLanguage: PropTypes.string.isRequired,
	setLanguage: PropTypes.func.isRequired,
};

export default LanguageSelector;
