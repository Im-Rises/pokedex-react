import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const CodeKeyboardInputsEasterEgg = props => {
	const [inputValue, setInputValue] = useState('');

	const handleKeyDown = event => {
		if (inputValue.length >= props.code.length) {
			setInputValue('');
		} else {
			const {keyCode} = event;
			setInputValue(prevValue => prevValue + keyCode);
		}
	};

	useEffect(() => {
		if (inputValue === props.code) {
			alert('You have unlocked the Konami Code!');
			setInputValue('');
		}
	}, [inputValue, props.code]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return <></>;
};

CodeKeyboardInputsEasterEgg.propTypes = {
	code: PropTypes.string.isRequired,
};
