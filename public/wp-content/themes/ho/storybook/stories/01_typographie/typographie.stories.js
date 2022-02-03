import { storiesOf, addDecorator, configure } from '@storybook/html';

import headlines from './headlines.html';
import rte from './rte.html';
import links from './links.html';
import buttons from './buttons.html';
import buttonsGroups from './button-groups.html';
import teaser from './teaser.html';

storiesOf('Typographie', module)
 // .add('Zeplin', () => zeplin, {notes: ''})
  .add('Headlines', () => headlines, {notes: ''})
  .add('Rich text', () => rte, {notes: ''})
  .add('Links', () => links, {notes: ''})
  .add('Buttons', () => buttons, {notes: ''})
  .add('Button - Groups', () => buttonsGroups, {notes: ''})
  .add('Teaser', () => teaser, {notes: ''})