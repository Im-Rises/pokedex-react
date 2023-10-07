import LazyLoadImage, {imageLinkGetter} from '../LazyLoadImage/LazyLoadImage.jsx';
import React from 'react';
import './PokedexPresentation.scss';

export const PokedexPresentation = () => (
	<div className={'pokedex-description'}>
        Welcome to the Pokédex, your ultimate Pokémon companion! Our user-friendly interface
        makes it easy to explore and learn about your favorite Pokémon.

        Here's how it works:

		<ol>
			<li><b>Pokémon Gallery : </b> On the right, you'll find a list of all available
                Pokémon. Simply click on any Pokémon to view its full-size image.
			</li>
			<li><b>Detailed Information: </b> Below the Pokémon image, you'll discover a button
                to access detailed information. Click it, and you'll uncover a wealth of
                knowledge about the selected Pokémon, including its abilities, type, and much
                more!
			</li>
			<li><b>Search Feature : </b> Looking for a specific Pokémon? No problem! Use the
                search bar in the top-right corner to quickly find the Pokémon you're interested
                in.
			</li>
			<li><b>Region-specific Details : </b> Dive deeper into the world of Pokémon by
                exploring region-specific information. Discover the habitat, behaviors, and
                unique characteristics of each Pokémon based on their region of origin.
			</li>
		</ol>

        The Pokédex is your gateway to the fascinating world of Pokémon. Explore, learn, and
        embark on your journey to become a Pokémon Master!

		<div>
			<p> pssst there's an easter egg, use their name to see it!</p>
			<div className={'github-contributors'}>
				<a href={'https://github.com/clementreiffers'} target='_blank'
					className={'github-pdp-link'} rel='noreferrer'>
					<figure>
						<LazyLoadImage
							imageGetter={() => imageLinkGetter('https://avatars.githubusercontent.com/u/44473020?v=4')}
							className={'github-pdp'}/>
						<figcaption>Clément Reiffers</figcaption>
					</figure>
				</a>
				<a href={'https://github.com/im-rises'} target='_blank'
					className={'github-pdp-link'} rel='noreferrer'>
					<figure>
						<LazyLoadImage
							imageGetter={() => imageLinkGetter('https://avatars.githubusercontent.com/u/59691442?v=4')}
							className={'github-pdp'}/>
						<figcaption>Quentin Morel</figcaption>
					</figure>
				</a>
			</div>
		</div>
	</div>
);
