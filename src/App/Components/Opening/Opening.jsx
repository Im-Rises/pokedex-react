import React, {useState} from 'react';
import './index.css';

export const Opening = () => {
	const [hasClicked, setHasClicked] = useState(false);

	const handleClick = () => setHasClicked(!hasClicked);

	const changeClassName = where => hasClicked ? `${where}-move` : `${where}-fixed`;

	return <div className={'opening'}>
		<div className={changeClassName('top')} />
		<input className={'opening-btn'} style={{display: hasClicked ? 'none' : 'block'}} type={'button'} value={'click\nto\nopen'} onClick={handleClick}/>
		<div className={changeClassName('bottom')}/>
	</div>;
};

