import React from 'react';
import {getLanguageIdentifiers} from '../../Requests/index';

const LanguageSelector = () => {
	const [languages, setLanguages] = React.useState([]);
	React.useEffect(() => {
		getLanguageIdentifiers().then(setLanguages);
	});

	return (
		<select>
			{languages.map(language => (
				<option key={language.id} value={language.id}>
					{language.name}
				</option>
			))}
		</select>
	);
};

export default LanguageSelector;
