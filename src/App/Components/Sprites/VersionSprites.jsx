import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const Version = props =>
	Object.keys(props.version).map((v, i) =>
		<ShowAllSpriteOfObject key={i} ObjectOfUrl={props.version[v]} title={v}/>);

Version.propTypes = {version: PropTypes.object.isRequired};

const Generation = props => <details>
	<summary>generation sprites</summary>
	{Object.keys(props.resp).map((version, i) => <details key={i}>
		<summary>{version}</summary>
		<Version version={props.resp[version]}/></details>)}
</details>;

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
