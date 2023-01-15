import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const Version = props =>
	Object.keys(props.version).map(k => <><h2>{k}</h2>
		<ShowAllSpriteOfObject ObjectOfUrl={props.version[k]}/>
	</>);

Version.propTypes = {version: PropTypes.object.isRequired};

const Generation = props => <>
	{Object.keys(props.resp).map((version, i) => <div key={i}>
		<h1>{version}</h1>
		<Version version={props.resp[version]}/></div>)}
</>;

Generation.propTypes = {
	resp: PropTypes.object.isRequired,
};

const VersionSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({versions}) => versions)
			.then(setState);
	}, [pokemon]);

	return <Generation resp={state}/>;
};

VersionSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default VersionSprites;
