import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import defaultIcon from '/src/images/loading/pokeball-loading-50x50.gif';

const LazyLoadImage = props => {
	const imageRef = useRef();

	useEffect(() => {
		if (props.src) {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// load image only if it's visible by users
						imageRef.current.src = props.src;
						observer.unobserve(imageRef.current);
					}
				});
			});

			observer.observe(imageRef.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [props.src]);

	return <img src={defaultIcon} alt={''} ref={imageRef}/>;
};

LazyLoadImage.propTypes = {
	src: PropTypes.string.isRequired,
};

export default LazyLoadImage;
