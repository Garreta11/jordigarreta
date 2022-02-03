import {
	storiesOf,
	addDecorator,
	configure
} from '@storybook/html';

import fonts from './fonts.html';
import zeplin from './zeplin.html';
import colors from './colors.html';
import spacing from './spacing.html';
import clamp from './clamp.html';

storiesOf('Basis', module)
	.add('Fonts', () => fonts, {
		notes: ''
	})
	.add('Clamp', () => clamp, {
		notes: ''
	})
	.add('Zeplin', () => zeplin, {
		notes: ''
	})
	.add('Farben', () => colors, {
		notes: ''
	})
	.add('Spacing', () => spacing, {
		notes: ''
	});