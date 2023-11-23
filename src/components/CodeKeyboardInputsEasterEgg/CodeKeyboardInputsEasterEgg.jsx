import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CodeKeyboardInputsEasterEgg = props => {
	const [inputValue, setInputValue] = useState('');

	const handleKeyDown = event => {
		const {keyCode} = event;
		setInputValue(inputValue + keyCode);
	};

	useEffect(() => {
		let inputString = inputValue;

		if (inputString === props.code) {
			// alert('You have unlocked the Konami Code!');
			toast('Easter Egg 1 found! Or should I say... Easter Pkm Egg?', {
				type: 'success',
				autoClose: 5000,
				icon: '🥚',
				closeOnClick: true,
				pauseOnHover: false,
			});
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
		<ToastContainer/>
	</>;
};

CodeKeyboardInputsEasterEgg.propTypes = {
	code: PropTypes.string.isRequired,
};
