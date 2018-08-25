import * as React from 'react';
import './App.css';
import * as style from './App.mod.scss';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <div className={style.App}>
          <h1>Hello, world!</h1>
        </div>
        <div>
          Whoopee!
        </div>
      </div>
    );
  }
}

export default App;
