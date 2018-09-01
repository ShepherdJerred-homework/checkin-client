import * as React from 'react';
import App from './App';
import './Root.scss';

export class Root extends React.Component {
  public render() {
    return (
      <div className="container-fluid">
        <header>
          <h1>Hello, world!</h1>
        </header>
        <App.StudentData render={App.StudentList}/>
      </div>
    );
  }
}

export default Root;
