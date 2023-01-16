import * as R from 'ramda';
import {getAllStringsValuesFromObject} from '../../Requests';
import Sprite from './Sprite';
import React from 'react';
import PropTypes from 'prop-types';

const ShowAllSpriteOfObject = ({ObjectOfUrl, title}) => {
	const zippedUrlName = R.zip(getAllStringsValuesFromObject(ObjectOfUrl), Object.keys(ObjectOfUrl));
	return <details>
		<summary>{title}</summary>
		<div style={{display: 'inline-flex'}}>
			{zippedUrlName.map(([url, name], i) => <Sprite key={i} name={name} url={url}/>)}
		</div>
	</details>;
};

ShowAllSpriteOfObject.propTypes = {
	ObjectOfUrl: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};

export default ShowAllSpriteOfObject;
