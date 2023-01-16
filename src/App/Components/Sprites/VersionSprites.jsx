import React from 'react';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfObject';

const Version = props =>
	Object.keys(props.version).map((v, i) =>
		<ShowAllSpriteOfObject key={i} ObjectOfUrl={props.version[v]} title={v}/>);

Version.propTypes = {version: PropTypes.object.isRequired};

const Generation = ({resp}) => <details>
	<summary>generation sprites</summary>
	{Object.keys(resp).map((version, i) => <details key={i}>
		<summary>{version}</summary>
		<Version version={resp[version]}/></details>)}
</details>;

Generation.propTypes = {
	resp: PropTypes.object.isRequired,
};

const VersionSprites = ({versions}) => <Generation resp={versions}/>;

VersionSprites.propTypes = {
	versions: PropTypes.string.isRequired,
};

export default VersionSprites;
