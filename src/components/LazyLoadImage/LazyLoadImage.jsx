import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const LazyLoadImage = props => {
	const imageRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Charger l'image lorsque l'élément devient visible
					imageRef.current.src = props.src;
					observer.unobserve(imageRef.current);
				}
			});
		});

		observer.observe(imageRef.current);

		return () => {
			observer.disconnect();
		};
	}, [props.src]);

	return <img ref={imageRef} alt=''/>;
};

LazyLoadImage.propTypes = {
	src: PropTypes.string.isRequired,
};
