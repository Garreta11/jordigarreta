import { storiesOf, addDecorator, configure } from '@storybook/html';


import form from './form.html';
import snackbar from './snackbar.html';
import loading from './loading.html';


storiesOf('Formulare', module)
  .add('Formular', () => form, {notes: ''})
  .add('Snackbar', () => snackbar, {notes: ''})
  .add('Loading', () => loading, {notes: ''});

storiesOf('Formulare/Barrierefreiheit', module)
	.addDecorator(storyFn => {
		return "<div class='tabbing'>"+storyFn()+"</div>";
	})
	.add('Formular', () => form, {notes: ''})
	.add('Snackbar', () => snackbar, {notes: ''})
	.add('Loading', () => loading, {notes: ''});