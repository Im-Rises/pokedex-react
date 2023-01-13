import * as R from 'ramda';
import {getAllStringsValuesFromObject} from '../../Requests';
import Sprite from './Sprite';
import React from 'react';
import PropTypes from 'prop-types';

const ShowAllSpriteOfObject = ({ObjectOfUrl}) => {
	const zippedUrlName = R.zip(getAllStringsValuesFromObject(ObjectOfUrl), Object.keys(ObjectOfUrl));
	return zippedUrlName.map(([url, name], i) => <Sprite key={i} name={name} url={url}/>);
};

ShowAllSpriteOfObject.propTypes = {
	ObjectOfUrl: PropTypes.object.isRequired,
};

export default ShowAllSpriteOfObject;
