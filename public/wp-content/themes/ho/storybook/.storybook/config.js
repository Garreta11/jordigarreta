import { addDecorator, addParameters, configure } from '@storybook/html';

//Addon Accessability
import { withA11y } from '@storybook/addon-a11y';
addDecorator(withA11y);

//Addon With HTML
import { withHTML } from '@whitespace/storybook-addon-html/html';
addDecorator(
	withHTML({
		prettier: {
			tabWidth: 4,
			useTabs: false,
			htmlWhitespaceSensitivity: 'strict',
		},
	}),
);


//import '!style-loader!css-loader!sass-loader!./scss-loader.scss';


// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);