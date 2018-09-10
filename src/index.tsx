import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/modal';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root') as HTMLElement
  );
});
