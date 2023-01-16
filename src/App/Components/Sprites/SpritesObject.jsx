import * as R from 'ramda';
import {getAllStringsValuesFromObject} from '../../Requests';
import Sprite from './Sprite';
import React from 'react';
import PropTypes from 'prop-types';

const SpritesObject = ({obj, title}) => {
	const zippedUrlName = R.zip(getAllStringsValuesFromObject(obj), Object.keys(obj));
	return <details>
		<summary>{title}</summary>
		<div style={{display: 'inline-flex'}}>
			{zippedUrlName.map(([url, name], i) => <Sprite key={i} name={name} url={url}/>)}
		</div>
	</details>;
};

SpritesObject.propTypes = {
	obj: PropTypes.object.isRequired,
	title: PropTypes.string,
};

export default SpritesObject;
