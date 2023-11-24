import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const CodeKeyboardInputsEasterEgg = props => {
	const [inputValue, setInputValue] = useState('');

	const handleKeyDown = event => {
		const {keyCode} = event;
		setInputValue(inputValue + keyCode);
	};

	useEffect(() => {
		let inputString = inputValue;

		if (inputString === props.code) {
			props.actionOnEasterEgg();
		}

		if (inputValue.length >= props.code.length) {
			inputString = inputString.slice(1);
		}

		setInputValue(inputString);
	}, [inputValue, props.code]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return <>
	</>;
};

CodeKeyboardInputsEasterEgg.propTypes = {
	code: PropTypes.string.isRequired,
	actionOnEasterEgg: PropTypes.func,
};
