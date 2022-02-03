import { withA11y } from '@storybook/addon-a11y';
import { withHTML } from '@whitespace/storybook-addon-html/html';
import { storiesOf, addDecorator, configure } from '@storybook/html';


import scss from './styleguide.scss';

addDecorator(withA11y);
addDecorator(withHTML);