import PropTypes from 'prop-types';
import React from 'react';

const Sprite = ({url, name}) => <figure key={Math.random()}>
	<img src={url} alt={'img of a pkm'}/>
	<figcaption>{name}</figcaption>
</figure>;

Sprite.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default Sprite;
