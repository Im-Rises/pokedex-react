import {GitHubLink} from './GitHubLink.jsx';
import './GitHubBar.scss';

export const GitHubBar = () => (
	<div className={'opening-github'}>
		<GitHubLink text={'Clément Reiffers'} link={'https://github.com/clementreiffers'}/>
		<GitHubLink text={'Quentin Morel'} link={'https://github.com/Im-Rises'}/>
	</div>
);
