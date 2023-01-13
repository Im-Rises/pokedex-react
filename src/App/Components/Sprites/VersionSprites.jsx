import React, {useEffect, useState} from 'react';
import {getAllStringsValuesFromObject, getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Sprite from './Sprite';

const ShowAllSpriteOfAnArray = props => {
	const zippedUrlName = R.zip(getAllStringsValuesFromObject(props.v), Object.keys(props.v));
	return zippedUrlName.map(([url, name], i) => <Sprite key={i} name={name} url={url}/>);
};

const Version = props => Object.keys(props.v).map(k => <><h1>{k}</h1>
	<ShowAllSpriteOfAnArray v={props.v[k]}/>
</>);

const Generation = props => <>
	{Object.keys(props.resp).map((v, i) => <Version key={i} v={props.resp[v]}/>)}
</>;

const VersionSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({versions}) => versions)
			.then(setState);
	}, [pokemon]);
	return (
		<ul>
			<Generation resp={state}/>
		</ul>);
};

VersionSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default VersionSprites;
