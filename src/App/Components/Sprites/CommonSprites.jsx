import React from 'react';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const CommonSprites = ({sprites}) => <ShowAllSpriteOfObject ObjectOfUrl={sprites} title={'common sprites'}/>;

CommonSprites.propTypes = {
	sprites: PropTypes.string.isRequired,
};

export default CommonSprites;
