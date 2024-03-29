import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import defaultIcon from '../../images/loading/pokeball-loading-50x50.gif';

const imageLinkGetter = link => new Promise(resolve => {
	resolve(link);
});

const LazyLoadImage = props => {
	const imageRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					props.imageGetter().then(icon => {
						imageRef.current.src = icon;
					}).catch(() => {
						// Prevent strange behavior when image is not loaded
						if (imageRef !== null && imageRef.current !== null) {
							imageRef.current.src = defaultIcon;
						}
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
	}, [props.imageGetter]);

	return <img src={defaultIcon} alt={''} ref={imageRef} className={props.className}/>;
};

LazyLoadImage.propTypes = {
	imageGetter: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export {imageLinkGetter};
export default LazyLoadImage;
