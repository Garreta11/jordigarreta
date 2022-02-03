import { storiesOf, addDecorator, configure } from '@storybook/html';


import icons from './icons.html';


storiesOf('Icons', module)
  .add('Icons', () => icons, {notes: ''})