import React, {useState} from 'react';
import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Opening = () => {
	const [hasClicked, setHasClicked] = useState(false);

	const handleClick = () => setHasClicked(!hasClicked);

	const changeClassName = where => hasClicked ? `${where}-move` : `${where}-fixed`;

	return <div className={'opening'}>
		<div className={changeClassName('top')}>
			<img className={'pokedex-logo'}
				src={'https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png'} alt={'pokedex'}/>
			<div className={'github-repo'}>
				<a className={'github-links'} href={'https://github.com/Im-Rises/pokedex-react'}>pokedex-react <GitHubIcon className={'github-icon'}/></a>
			</div>
		</div>
		<input className={'opening-btn'} style={{display: hasClicked ? 'none' : 'block'}} type={'button'}
			value={'click\nto\nopen'} onClick={handleClick}/>
		<div className={changeClassName('bottom')}>
			<div className={'opening-github'}>
				<div className={'left'}>
					<a className={'github-links'} href={'https://github.com/clementreiffers'}>clementreiffers <GitHubIcon className={'github-icon'}/></a>
				</div>
				<div className={'right'}>
					<a className={'github-links'} href={'https://github.com/Im-Rises'}>Im-Rises<GitHubIcon className={'github-icon'}/></a>
				</div>
			</div>
		</div>
	</div>;
};
