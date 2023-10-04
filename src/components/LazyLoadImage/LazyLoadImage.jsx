import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import defaultIcon from '../../images/loading/pokeball-loading-50x50.gif';

const LazyLoadImage = props => {
	const imageRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					props.imageGetter().then(icon => {
						imageRef.current.src = icon;
					});
					// load image only if it's visible by users
					observer.unobserve(imageRef.current);
				}
			});
		});

		observer.observe(imageRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return <img src={defaultIcon} alt={''} ref={imageRef}/>;
};

LazyLoadImage.propTypes = {
	imageGetter: PropTypes.func,
};

export default LazyLoadImage;
